import { Injectable, } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './Dto/auth.credential.dto';
import { UserTypeNames } from 'src/user-type/user-types-names';

@Injectable()
export class  AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    
    const user = await this.usersService.findByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(authCredentialDto: AuthCredentialDto): Promise<any> {
    const {username, password} = authCredentialDto;
 
    

    if(await this.usersService.validateUser(username, password)){
      const selectedUser= await  this.usersService.findByUserName(username);
      
      
      const payload = {usr: (await selectedUser).username, 
        fname: (selectedUser).firstName, 
        lname: (selectedUser).lastName, 
        countryId:selectedUser.country.id,
        ...([UserTypeNames.PMUAdmin].includes(selectedUser.userType.id) || [UserTypeNames.PMUUser].includes(selectedUser.userType.id)) &&{ institutionId:selectedUser.institution.id},
        roles : [(selectedUser).userType.name]};
      

      const expiresIn = '240h';  
      let token = this.jwtService.sign(payload, { expiresIn });
      return {access_token: token};
    }
    else{

      return null;
    }
  }
}
