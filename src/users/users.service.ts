import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ResetPassword } from 'src/auth/Dto/reset.password.dto';
import { UserType } from './user.type.entity';
import { ConfigService } from '@nestjs/config';
import { Institution } from 'src/institution/institution.entity';
import { RecordStatus } from 'src/shared/entities/base.tracking.entity';
import { EmailNotificationService } from 'src/notifications/email.notification.service';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from 'src/country/entity/country.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ReqUserDto } from './dto/req.dto';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(UserType)
    private readonly usersTypeRepository: Repository<UserType>,
    private readonly emaiService: EmailNotificationService,
    private configService: ConfigService,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {
    super(repo);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let userType = await this.usersTypeRepository.findOne({
      where: { id: createUserDto.userType },
    });
    let countryId = null;
    let insId = null;
    if (createUserDto.userType == 3) {
      countryId = null;
      insId = createUserDto.institution;
    } else if (createUserDto.userType == 2) {
      countryId = createUserDto.country;
      insId = 0;
      let cou = await this.countryRepo.findOne({
        where: {
          id: countryId,
        },
      });
      cou.isCA = true;
      this.countryRepo.save(cou);
    } else if (createUserDto.userType == 1) {
      countryId = null;
      insId = createUserDto.institution;
    } else if (createUserDto.userType == 5) {
      countryId = null;
      insId = createUserDto.institution;
    }
    let institution = await this.institutionRepository.findOne({
      where: { id: insId },
    });
    let country = await this.countryRepo.findOne({
      where: {
        id: countryId,
      },
    });

    let newUser = new User();

    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.mobile = createUserDto.mobile;
    newUser.status = RecordStatus.Active;
    newUser.telephone = createUserDto.telephone;
    newUser.userType = userType;
    newUser.institution = institution;
    newUser.country = country;
    newUser.mrvInstitution = createUserDto.mrvInstitution;
    newUser.salt = await bcrypt.genSalt();

    let newUUID = uuidv4();
    let newPassword = ('' + newUUID).substr(0, 6);
    createUserDto.password = newPassword;
    newUser.password = await this.hashPassword(createUserDto.password, newUser.salt);

    const activationToken = uuidv4();
    newUser.resetToken = activationToken;
    newUser.resetTokenExpiration = new Date(Date.now() + 72 * 60 * 60 * 1000);

    var newUserDb = await this.usersRepository.save(newUser);
    if (newUser.userType.id != 2) {
      const activationUrl = `${process.env.ClientURl}reset-password?token=${activationToken}&email=${encodeURIComponent(newUser.email)}&activate=true`;

      const template = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>Dear ${newUserDb.firstName} ${newUser.lastName},</p>
          <p>Welcome to the <strong>TC Toolkit</strong>! Your account has been created successfully.</p>
          <p>To get started, please set your password by clicking the button below:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${activationUrl}"
               style="background-color: #0d6efd; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Activate Your Account
            </a>
          </p>
          <p>If the button above does not work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; font-size: 13px; color: #666;">${activationUrl}</p>
          <p><strong>Note:</strong> This link will expire in 72 hours.</p>
          <p>If you did not request this account, please ignore this email.</p>
          <br/>
          <p>Best regards,<br/><strong>ICAT TC Toolkit Team</strong><br/>United Nations Office for Project Services (UNOPS)</p>
        </div>
      `;

      try {
        await this.emaiService.sendMail(
          newUserDb.email,
          'Activate Your TC Toolkit Account',
          '',
          template,
        );
      } catch (e) {
        console.error(`Failed to send activation email to ${newUserDb.email}:`, e.message || e);
      }
    }

    newUserDb.password = '';
    newUserDb.salt = '';

    return newUserDb;
  }

  async chnageStatus(userId: number, status: number): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { id: userId } });
    user.status = status;
    return this.usersRepository.save(user);
  }

  async chnagePassword(userId: number, newPassword: string): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { id: userId } });
    user.password = newPassword;
    return this.usersRepository.save(user);
  }

  async updateChangePasswordToken(
    userId: number,
    resetToken: string,
    tokenExpiration: Date,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    user.resetToken = resetToken;
    user.resetTokenExpiration = tokenExpiration;

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByUserName(userName: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username: userName } });
  }

  async validateUser(userName: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username: userName } });
    return (await user).validatePassword(password);
  }

  async isUserAvailable(userName: string): Promise<any> {
    let user = await this.usersRepository.findOne({ where: { username: userName } });
    if (user) {
      return user;
    } else {
      return user;
    }
  }

  async findUserByUserName(userName: string): Promise<any> {
    return await this.usersRepository
      .findOne({ where: { username: userName } })
      .then((value) => {
        if (!!value) {
          return value;
        } else {
          return 0;
        }
      })
      .catch(() => {
        return 0;
      });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id + '');
  }

  async validateResetPasswordRequest(
    email: string,
    token: string,
  ): Promise<{ valid: boolean; expired?: boolean; message?: string }> {
    const user = await this.usersRepository.findOne({ where: { email: email } });

    if (!user) {
      return { valid: false, message: 'User not found' };
    }

    if (user.resetToken !== token) {
      return { valid: false, message: 'Invalid token' };
    }

    if (user.resetTokenExpiration && new Date() > user.resetTokenExpiration) {
      return { valid: false, expired: true, message: 'Token has expired. Please request a new password reset.' };
    }

    return { valid: true };
  }

  async resetPassword(dto: ResetPassword): Promise<{ success: boolean; expired?: boolean; message?: string }> {
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.resetTokenExpiration && new Date() > user.resetTokenExpiration) {
      return { success: false, expired: true, message: 'Your activation code has expired. Please request a new password reset.' };
    }

    if (dto.token && user.resetToken !== dto.token) {
      return { success: false, message: 'Invalid token' };
    }

    user.password = await bcrypt.hash(dto.password, user.salt);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await this.usersRepository.save(user);

    const loginUrl = user.userType && user.userType.id === 2 ? process.env.LOGIN_URL_COUNTRY : process.env.ClientURl;

    const template = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <p>Dear ${user.firstName} ${user.lastName},</p>
        <p>Your password for the <strong>TC Toolkit</strong> has been updated successfully.</p>
        <p>You can now log in using your email address: <strong>${user.email}</strong></p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${loginUrl}"
             style="background-color: #0d6efd; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Log In
          </a>
        </p>
        <p>If you did not make this change, please contact the support team immediately.</p>
        <br/>
        <p>Best regards,<br/><strong>ICAT TC Toolkit Team</strong><br/>United Nations Office for Project Services (UNOPS)</p>
      </div>
    `;

    await this.emaiService.sendMail(user.email, 'TC Toolkit - Password Updated', '', template);

    return { success: true };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async getUserDetails(
    options: IPaginationOptions,
    filterText: string,
    userTypeId: number,
  ): Promise<Pagination<User>> {
    let filter: string = '';

    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(user.firstName LIKE :filterText OR user.lastName LIKE :filterText OR user.telephone LIKE :filterText OR user.email LIKE :filterText OR ins.name LIKE :filterText OR type.name LIKE :filterText)';
    }

    if (userTypeId != 0) {
      if (filter) {
        filter = `${filter} and user.userTypeId = :userTypeId`;
      } else {
        filter = `user.userTypeId = :userTypeId`;
      }
    }

    let data = this.repo
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.institution', Institution, 'ins', 'ins.id = user.institutionId')
      .leftJoinAndMapOne('user.userType', UserType, 'type', 'type.id = user.userTypeId')
      .leftJoinAndMapOne('user.country', Country, 'country', 'country.id = user.countryId')
      .where(filter, {
        filterText: `%${filterText}%`,
        userTypeId,
      })
      .orderBy('user.status', 'ASC');

    let result = await paginate(data, options);

    if (result) {
      return result;
    }
  }

  async findUserByUserType() {
    let data = await this.repo
      .createQueryBuilder('u')
      .select('*')
      .where('u.userTypeId = 2')
      .execute();
    return data;
  }

  async findByIns(insId: number) {
    this.repo.createQueryBuilder('user').leftJoinAndMapOne(
      'user.institution',
      Institution,
      'ins',
      `user.institutionId= ${insId}`,
    );
  }

  async getType(type: string) {
    let filter = [];
    if (type == 'PMU admin' || type == 'PMU user') {
      let data = await this.usersTypeRepository.find();
      for (let a of data) {
        if (a.id == 2) {
          filter.push(a);
        } else if (a.id == 3) {
          filter.push(a);
        }
      }
      return filter;
    } else {
      return await this.usersTypeRepository.find();
    }
  }

  async getUserByCountry(options: IPaginationOptions, type: ReqUserDto) {
    if (type) {
      let filter: string = '';
      filter = type.andoprator;
      if (type.oroprator) {
        filter += ' and ' + type.oroprator;
      }
      let data = this.repo
        .createQueryBuilder('user')
        .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id=user.userTypeId')
        .leftJoinAndMapOne('user.institution', Institution, 'institution', 'institution.id=user.institutionId')
        .leftJoinAndMapOne('user.country', Country, 'country', 'country.id=user.countryId')
        .where(filter, { type });
      return await paginate(data, options);
    } else {
      let data = this.repo
        .createQueryBuilder('user')
        .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id=user.userTypeId')
        .leftJoinAndMapOne('user.institution', Institution, 'institution', 'institution.id=user.institutionId')
        .leftJoinAndMapOne('user.country', Country, 'country', 'country.id=user.countryId');
      return await paginate(data, options);
    }
  }

  async getFilteredUsers(filter: string): Promise<any> {
    let data = this.repo
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.userType', UserType, 'userType', 'userType.id=user.userTypeId')
      .leftJoinAndMapOne('user.institution', Institution, 'institution', 'institution.id=user.institutionId')
      .leftJoinAndMapOne('user.country', Country, 'country', 'country.id=user.countryId')
      .where(filter, { filter })
      .orderBy('user.id', 'DESC');
    return await data.getMany();
  }

  async update(id: number, user: User) {
    try {
      let us = await this.repo.findOne({ where: { id: id } });
      let co = new Country();
      co.id = user.country.id;
      us.country = co;
      us.firstName = user.firstName;
      us.lastName = user.lastName;
      us.mobile = user.mobile;
      us.telephone = user.telephone;
      return await this.repo.update({ id: id }, us);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async saveOneUser(user: User) {}
}
