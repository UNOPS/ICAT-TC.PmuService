import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from 'src/master-data/sector/sector.entity';
import { LearningMaterialSector } from './entity/learning-material-sector.entity';
import { LearningMaterialUserType } from './entity/learning-material-usertype.entity';
import { LearningMaterial } from './entity/learning-material.entity';
// import { LearningMaterialSectorController } from './learning-material-sector.controller';
import { LearningMaterialSectorService } from './learning-material-sector.service';
import { LearningMaterialUsreTypeService } from './learning-material-usertype.service';
import { LearningMaterialController } from './learning-material.controller';
import { LearningMaterialService } from './learning-material.service';

@Module({
  imports: [TypeOrmModule.forFeature([LearningMaterial,Sector,LearningMaterialSector,LearningMaterialUserType])],
  controllers: [LearningMaterialController],
  providers: [LearningMaterialService,LearningMaterialSectorService,LearningMaterialUsreTypeService,Sector,LearningMaterialSector,LearningMaterialUserType],
  exports: [LearningMaterialService,LearningMaterialSectorService,LearningMaterialUsreTypeService],
})
export class LearningMaterialModule {}
