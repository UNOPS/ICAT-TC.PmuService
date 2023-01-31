export class CreateUserDto {
  userType : number;//change userTypeId
  firstName: string;
  lastName: string;
  username : string;
  password : string;
  email : string;
  title: string;
  institution: number;//institutionId
 // designation: string;
  mrvInstitution:string
  telephone: string;
  mobile: string;
  nic: string;
  country:number;//add by pasindu
}
