import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { UserType } from 'src/users/user.type.entity';
import { UserTypeService } from './user.type.service';
import { Request, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Crud({
  model: {
    type: UserType,
  },
})
@Controller('usertype')
export class UserTypeController implements CrudController<UserType> {
  constructor(
    public service: UserTypeService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  get base(): CrudController<UserType> {
    return this;
  }

  //   @Override()
  //   async getMany(
  //     @ParsedRequest() req: CrudRequest,
  //     @Request() req2,
  //   ): Promise<GetManyDefaultResponse<UserType> | UserType[]> {
  //     let userEmail = req2.user?.email;

  //     let currentDBUser = await this.usersRepository.findOne({
  //       where: { email: userEmail },
  //     });

  //     console.log(
  //       'currentDBUsercurrentDBUsercurrentDBUsercurrentDBUsercurrentDBUser',
  //       currentDBUser,
  //     );

  //     // if (currentDBUser?.userType.id != 1) {
  //     //   // not ccs admin , only send DEO

  //     //   req.parsed.search['$and'].push({ id: 4 });
  //     // }

  //     let userList = this.base.getManyBase(req);
  //     console.log(userList);

  //     return userList;
  //   }
}
