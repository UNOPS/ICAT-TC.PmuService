import { Controller, Get, Query } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
} from '@nestjsx/crud';
import { UserType } from 'src/users/user.type.entity';
import { UserTypeService } from './user.type.service';
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
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  get base(): CrudController<UserType> {
    return this;
  }

  @Get('get-many-user-types')
  async getManyUserTypes( @Query('filter') filter: number[],): Promise< UserType[]> {
    return await this.service.getManyUserTypes(filter)
  }
}
