import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Sector } from 'src/master-data/sector/sector.entity';
import { UserType } from 'src/users/user.type.entity';
import { LearningMaterialSector } from './entity/learning-material-sector.entity';
import { LearningMaterialUserType } from './entity/learning-material-usertype.entity';
import { LearningMaterial } from './entity/learning-material.entity';
@Injectable()
export class LearningMaterialService extends TypeOrmCrudService<LearningMaterial> {

    constructor(@InjectRepository(LearningMaterial) repo) {
        super(repo);
    }



    async softDelete(id: number) {
      this.repo.softDelete({ id });
      return;
    }
    
    async getlearningmaterialdetails(
        options: IPaginationOptions,
        filterText: string,
        typeId: number,
        sectorId: number,
        sortOrder: number,
        sortType: number,
    ): Promise<Pagination<LearningMaterial>>{
        let filter: string = '';

      if(filterText != null && filterText != undefined && filterText != ''){
            filter = 
            '(lm.documentType LIKE :filterText OR lm.documentName LIKE :filterText OR lm.editedOn LIKE :filterText)';
        }

       if (typeId != 0) {
            if (filter) {
              filter = `${filter}  and ut.id = :typeId`;
            } else {
              filter = `ut.id = :typeId`;
            }
          }  

          if (sectorId != 0) {
            if (filter) {
              filter = `${filter}  and st.id = :sectorId`;
            } else {
              filter = `st.id = :sectorId`;
            }
          }    
        
         
        // let ltype = 'ASC';

        if(sortOrder == 0)
        {
          if(sortType == 0)
          {
            var val = 'lm.editedOn';
          }
          else
          {
            var val = 'lm.documentName';
          }
          var data = this.repo
          .createQueryBuilder('lm')
          .leftJoinAndMapMany('lm.learningMaterialUserType', LearningMaterialUserType, 'lmu', 'lmu.learningMaterialId = lm.Id')
          .leftJoinAndMapMany('lm.userType', UserType, 'ut', 'lmu.userTypeId = ut.Id')
          .leftJoinAndMapMany('lm.learningMaterialSector', LearningMaterialSector, 'lms', 'lms.learningMaterial2Id = lm.Id')
          .leftJoinAndMapMany('lm.sector', Sector, 'st', 'lms.sectorId = st.Id')
          .where(filter, {
              filterText: `%${filterText}%`,
              typeId,
              sectorId,
          })
          //.orderBy('lm.documentName', 'ASC'); DESC
          .orderBy(val, 'DESC');
        }
        else
        {
          if(sortType == 0)
          {
            var val = 'lm.editedOn';
          }
          else
          {
            var val = 'lm.documentName';
          }
          var data = this.repo
          .createQueryBuilder('lm')
          .leftJoinAndMapMany('lm.learningMaterialUserType', LearningMaterialUserType, 'lmu', 'lmu.learningMaterialId = lm.Id')
          .leftJoinAndMapMany('lm.userType', UserType, 'ut', 'lmu.userTypeId = ut.Id')
          .leftJoinAndMapMany('lm.learningMaterialSector', LearningMaterialSector, 'lms', 'lms.learningMaterial2Id = lm.Id')
          .leftJoinAndMapMany('lm.sector', Sector, 'st', 'lms.sectorId = st.Id')
          .where(filter, {
              filterText: `%${filterText}%`,
              typeId,
              sectorId,
          })
          //.orderBy('lm.documentName', 'ASC'); DESC
          .orderBy(val, 'ASC');

        }

            
            

            let resualt = await paginate(data, options);
      /*    console.log(
      '=====================================================================',
     );
    console.log(data.getQuery()); */
            if(resualt){
                return resualt;
            }
      }


}
