import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcript from 'bcrypt';
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

    let userType = await this.usersTypeRepository.findOne(
      createUserDto.userType['id'],
    );
    let countryId = null;
    let insId = null;
    if (createUserDto.userType['id'] == 3) {
      countryId = null;
      insId = createUserDto.institution['id'];
    }
    else if (createUserDto.userType['id'] == 2) {
      countryId = createUserDto.country['id'];
      insId = 0;
      let cou = await this.countryRepo.findOne(countryId);
      cou.isCA = true;
      this.countryRepo.save(cou)
    }

    else if (createUserDto.userType['id'] == 1) {
      countryId = null;
      insId = createUserDto.institution['id'];
    }

    else if (createUserDto.userType['id'] == 5) {
      countryId = null;
      insId = createUserDto.institution['id'];
    }


    let institution = await this.institutionRepository.findOne(
      insId
    );
    let country = await this.countryRepo.findOne(countryId);

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
    newUser.salt = await bcript.genSalt();

    let newUUID = uuidv4();
    let newPassword = ('' + newUUID).substr(0, 6);
    createUserDto.password = newPassword;
    newUser.password = await this.hashPassword(
      createUserDto.password,
      newUser.salt,
    );
    newUser.resetToken = '';

    var newUserDb = await this.usersRepository.save(newUser);
    let systemLoginUrl = '';
    if (newUser.userType.id != 2) {
      let url = process.env.ClientURl + "reset-password"
      systemLoginUrl = url
      var template =
        'Dear ' +
        newUserDb.firstName +
        ' ' +
        newUserDb.lastName +
        ' <br/>Your username is : ' +
        newUserDb.email +
        ' <br/> your login code is : ' +
        newPassword +
        ' <br/>System login url is :' + ' <a href="' + systemLoginUrl + '">' + systemLoginUrl + '</a>' +
        '<br/>' +
        '<br/>Best regards' +
        '<br/>Software support team';
      this.emaiService.sendMail(
        newUserDb.email,
        'Your credentials for ICAT system',
        '',
        template,
      );
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

  async updateChnagePasswordToken(
    userId: number,
    newToken: string,
  ): Promise<User> {
    let url = process.env.ClientURl + "login"
    let systemLoginUrl = url
    let user = await this.usersRepository.findOne({ where: { id: userId } });
    user.resetToken = newToken;
    let newUUID = uuidv4();
    let newPassword = ('' + newUUID).substr(0, 6);
    user.password = await this.hashPassword(
      user.password,
      user.salt,
    );
    user.password = newPassword;
    this.usersRepository.save(user);

    var template =
      'Dear ' + user.firstName + " " + user.lastName +
      ' <br/>Your username is ' +
      user.email +
      '<br/> your login password is : ' +
      newPassword +
      ' <br/>System login url is ' + '<a href="systemLoginUrl">' +
      systemLoginUrl;

    this.emaiService.sendMail(
      user.email,
      'Your credentials for ICAT system',
      '',
      template,
    );

    return this.usersRepository.save(user);
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

  async findUserByEmail(email: string): Promise<any> {
    return await this.usersRepository
      .findOne({ where: { email: email } })
      .then((value) => {
        if (!!value) {

          return value;
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id + '');
  }

  async validateResetPasswordRequest(
    email: string,
    token: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email: email } });

    if (user && user.resetToken === token) {

      return true;
    } else {

      return false;
    }
  }

  async resetPassword(email: string, password: string, code: string): Promise<boolean> {
    let systemLoginUrl;
    let user = await this.usersRepository.findOne({ where: { email: email } });
    if (user.userType.id == 2) {
      const url = process.env.COUNTRY_LOGIN_URL;
    }
    else {
      let url = process.env.ClientURl + "login"
      systemLoginUrl = url;
    }
    if (user) {
      if (code) {
        const hashPassword = await bcript.hash(code, user.salt);
        if (hashPassword == user.password) {
          let salt = await bcript.genSalt();
          user.salt = salt;
          user.password = await this.hashPassword(
            password,
            user.salt,
          );
          await this.usersRepository.save(user);
          var template =
            'Dear ' + user.firstName + " " + user.lastName +
            ' <br/>Your username is ' +
            user.email +
            '<br/> your login password is : ' +
            password +
            ' <br/>System login url is ' + '<a href="systemLoginUrl">' +
            systemLoginUrl;

          this.emaiService.sendMail(
            user.email,
            'Your credentials for ICAT system',
            '',
            template,
          );

          return true;
        }

        return false;
      }

      else {
        let salt = await bcript.genSalt();
        user.salt = salt;
        user.password = await this.hashPassword(
          password,
          user.salt,
        );
        await this.usersRepository.save(user);
        var template =
          'Dear ' + user.firstName + " " + user.lastName +
          ' <br/>Your username is ' +
          user.email +
          '<br/> your login password is : ' +
          password +
          ' <br/>System login url is ' + '<a href="systemLoginUrl">' +
          systemLoginUrl;

        this.emaiService.sendMail(
          user.email,
          'Your credentials for ICAT system',
          '',
          template,
        );

        return true;
      }


    }

    return false;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcript.hash(password, salt);
  }


  async getUserDetails(

    options: IPaginationOptions,
    filterText: string,
    userTypeId: number,
  ): Promise<Pagination<User>> {
    let filter: string = '';

    if (filterText != null && filterText != undefined && filterText != '') {
      filter =
        '(user.firstName LIKE :filterText OR user.lastName LIKE :filterText OR user.telephone LIKE :filterText OR user.email LIKE :filterText OR ins.name LIKE :filterText OR type.name LIKE :filterText)'
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
      .leftJoinAndMapOne('user.institution', Institution, 'ins', 'ins.id = user.institutionId',)
      .leftJoinAndMapOne('user.userType', UserType, 'type', 'type.id = user.userTypeId',)

      .where(filter, {
        filterText: `%${filterText}%`,
        userTypeId,
      }).orderBy('user.status', 'ASC');

    let result = await paginate(data, options);

    if (result) {
      return result;
    }
  }

  async findUserByUserType() {
    let data = await this.repo
      .createQueryBuilder('u')
      .select('*')
      .where(
        'u.userTypeId = 2'
      ).execute();
    return data;
  }

  async findByIns(insId: number) {
    this.repo.createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.institution',
        Institution,
        'ins',
        `user.institutionId= ${insId}`
      )
  }


  async getType(type: string) {
    let filter = [];
    if (type == "PMU Admin" || type == "PMU User") {
      let data = await this.usersTypeRepository.find();
      for (let a of data) {
        if (a.id == 2) {
          filter.push(a);
        }
        else if (a.id ==3 ) {
          filter.push(a);
        }
      }
      return filter;
    }
    else{
      await this.usersTypeRepository.find();
    }
  }

  async getUserByCountry(  options: IPaginationOptions,type: ReqUserDto) {
    if(type){
      let filter: string = '';
      filter = type.andoprator 
      if(type.oroprator){filter+  " and "+type.oroprator;}
      let data =this.repo.createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.userType',
        UserType,
        'userType',
        'userType.id=user.userTypeId'
      ) 
       .leftJoinAndMapOne(
        'user.institution',
        Institution,
        'institution',
        'institution.id=user.institutionId'
      )
      .where(filter,{type} );
      return await paginate(data, options);
    }
    else{
      let data =this.repo.createQueryBuilder('user')
      .leftJoinAndMapOne(
        'user.userType',
        UserType,
        'userType',
        'userType.id=user.userTypeId'
      ) 
       .leftJoinAndMapOne(
        'user.institution',
        Institution,
        'institution',
        'institution.id=user.institutionId'
      )
      return await paginate(data, options);
    }
  }
}

