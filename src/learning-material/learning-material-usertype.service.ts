import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { LearningMaterialUserType } from "./entity/learning-material-usertype.entity";


@Injectable()
export class LearningMaterialUsreTypeService extends TypeOrmCrudService<LearningMaterialUserType> {

    constructor(@InjectRepository(LearningMaterialUserType) repo) {
        super(repo);
    }

    async getdatails(){
        return this.repo.find({relations:['userType','learningMaterial']});
    }
}