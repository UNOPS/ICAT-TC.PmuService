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
      where:{id:createUserDto.userType}
    }
    );
    let countryId = null;
    let insId = null;
    if (createUserDto.userType == 3) {
      countryId = null;
      insId = createUserDto.institution;
    }
    else if (createUserDto.userType == 2) {
      countryId = createUserDto.country;
      insId = 0;
      let cou = await this.countryRepo.findOne({
        where:{
          id:countryId
        }
      });
      cou.isCA = true;
      this.countryRepo.save(cou)
    }

    else if (createUserDto.userType == 1) {
      countryId = null;
      insId = createUserDto.institution;
    }

    else if (createUserDto.userType == 5) {
      countryId = null;
      insId = createUserDto.institution;
    }
    let institution = await this.institutionRepository.findOne({
      where:{id:insId}
      
      });
    let country = await this.countryRepo.findOne({
      where:{
        id:countryId
      }
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
    newUser.password = await this.hashPassword(
      createUserDto.password,
      newUser.salt,
    );
    newUser.resetToken = '';

    var newUserDb = await this.usersRepository.save(newUser);
    console.log(newUserDb)
    let systemLoginUrl = '';
    if (newUser.userType.id != 2) {
      let url = process.env.ClientURl + "reset-password"
      systemLoginUrl = url
      var template =
        'Dear ' + newUserDb.firstName+ " " + newUser.lastName +','+
        '<br/> <br/>Your username is : ' + newUser.email +
        ' <br/> your login code is : ' + newPassword +
        '<br/> <br/>To log in to the system, please visit the following URL :' + ' <a href="' + systemLoginUrl + '">' + " Reset password" + '</a>.' +
        '<br/>' +
        '<br/>Best regards,' +
        '<br/>Software support team';
      this.emaiService.sendMail(
        newUserDb.email,
        'Your credentials for TC toolkit',
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
      'Dear ' + user.firstName + " " + user.lastName + ","+
      '<br/><br/>Your username is :' + user.email +
      '<br/> your login password is : ' + newPassword +

        ' <br/><br/>To log in to the system, please visit the following URL : ' + '<a href="' +systemLoginUrl+'">' + "System login" +'</a>' +'.'
      +'<br/>' +
        '<br/>Best regards,' +
        '<br/>Software support team';

    this.emaiService.sendMail(
      user.email,
      'Your credentials for TC toolkit',
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

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
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


  async resetPassword(dto: ResetPassword): Promise<boolean> {
    let systemLoginUrl;
    const user = await this.usersRepository.findOne({ where: { email: dto.email } });

    if (!user || user.resetToken !== dto.token || new Date() > user.resetTokenExpiration) {
      throw new Error('Invalid or expired token');
    }
  
    user.password = await bcrypt.hash(dto.password, user.salt);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await this.usersRepository.save(user);
  
    const url = user.userType && user.userType.id === 2 ? process.env.COUNTRY_LOGIN_URL : process.env.ClientURl;
    systemLoginUrl = url;
  
    const template =
      `Dear ${user.firstName} ${user.lastName},<br/>
      Your username is ${user.email}<br/>
      Your new login password has been reset.<br/>
      System login URL: <a href="${systemLoginUrl}">${systemLoginUrl}</a>`;
  
    await this.emaiService.sendMail(user.email, 'Your credentials for TC Toolkit system', '', template);
  
    return true;
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
    if (type == "PMU admin" || type == "PMU user") {
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
      return await this.usersTypeRepository.find();
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

  async getFilteredUsers(filter: string): Promise<any> {
    let data = this.repo
      .createQueryBuilder('user')
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
      .leftJoinAndMapOne(
        'user.country',
        Country,
        'country',
        'country.id=user.countryId'
      )
      .where(filter,{filter})
      .orderBy('user.id', 'DESC');
    return await data.getMany()
  }

  async update(id: number, user: User) {
    try {
      let us =await this.repo.findOne({where:{id:id}});
      let co = new Country();
      co.id= user.country.id
      us.country =co;
      us.firstName =user.firstName;
      us.lastName =user.lastName;
      us.mobile =user.mobile;
      us.telephone = user.telephone;
      return await this.repo.update({ id: id }, us);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async saveOneUser(user:User){

  }

}

