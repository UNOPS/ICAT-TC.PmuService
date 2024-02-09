import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { UserType } from "src/users/user.type.entity";

@Injectable()
export class UserTypeService extends TypeOrmCrudService<UserType> {

  constructor(@InjectRepository(UserType) repo) {
    super(repo);
  }
  async  getManyUserTypes(filter: number[]):Promise<UserType[]> {
    let data = this.repo
    .createQueryBuilder('userType')
    .andWhere('userType.id NOT IN (:ids)', { ids: filter })
    .orderBy('name', 'ASC');
    return await data.getMany()

  }
}
