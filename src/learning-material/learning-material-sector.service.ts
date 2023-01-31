import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { LearningMaterialSector } from "./entity/learning-material-sector.entity";


@Injectable()
export class LearningMaterialSectorService extends TypeOrmCrudService<LearningMaterialSector> {

    constructor(@InjectRepository(LearningMaterialSector) repo) {
        super(repo);
    }

    async getdatails(){
        return this.repo.find({relations:['sector','learningMaterial2']});
    }
}