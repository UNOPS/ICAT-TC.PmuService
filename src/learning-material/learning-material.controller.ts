import { Controller, Get, Query, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Sector } from 'src/master-data/sector/sector.entity';
import { Repository } from 'typeorm';
import { LearningMaterialSector } from './entity/learning-material-sector.entity';
import { LearningMaterialUserType } from './entity/learning-material-usertype.entity';
//import { request } from 'http';
import { LearningMaterial } from './entity/learning-material.entity';
import { LearningMaterialSectorService } from './learning-material-sector.service';
import { LearningMaterialUsreTypeService } from './learning-material-usertype.service';
import { LearningMaterialService } from './learning-material.service';

@Crud({
  model: {
    type: LearningMaterial,
  },
  query: {
    join: {
      learningMaterialsector: {
        eager: true,
      },
      learningMaterialusertype: {
        eager: true,
      },
      sector: {
        eager: true,
      },
    },
  },
})

@Controller('learning-material')
export class LearningMaterialController implements CrudController<LearningMaterial>{

  constructor(
    public service: LearningMaterialService,
    public typeService: LearningMaterialUsreTypeService,
    public sectorService: LearningMaterialSectorService,
    @InjectRepository(LearningMaterial)
    public LearningMaterialRepo: Repository<LearningMaterial>,
    @InjectRepository(Sector)
    public SectorRepo: Repository<Sector>,
    @InjectRepository(LearningMaterialSector)
    public LearningMaterialSectorRepo: Repository<LearningMaterialSector>,
    @InjectRepository(LearningMaterialUserType)
    public LearningMaterialUserTypeRepo: Repository<LearningMaterialUserType>,

  ) { }

  get base(): CrudController<LearningMaterial> {
    return this;
  }


  @Get(
    'learning-material/learning-materialinfo/:page/:limit/:filterText/:typeId/:sectorId/:sortOrder/:sortType',
  )
  async getLearningMaterialDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('typeId') typeId: number,
    @Query('sectorId') sectorId: number,
    @Query('sortOrder') sortOrder: number,
    @Query('sortType') sortType: number,
  ): Promise<any> {
    return await this.service.getlearningmaterialdetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      typeId,
      sectorId,
      sortOrder,
      sortType
    );
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const id = req.parsed.paramsFilter
    // console.log("hmm id ",req.options.params.id)
    let lmId = req.parsed.paramsFilter[0].value;
    const res = await this.service.softDelete(lmId);
    // console.log("hmm id ",req.parsed.paramsFilter[0].value);
    //   .find(f => f.field === 'id' && f.operator === '$eq').value;
    // const res = await this.service.softDelete(id);
    // const res = await this.LearningMaterialRepo.delete(lmId);
    //const x = await this.LearningMaterialSectorRepo.find(f => f.learningMaterial2Id == lmId);
    // console.log("xxxxx ",x)
    // const res = await this.LearningMaterialSectorRepo.delete(lmId);
    return 1;
  }







  @Override()
  async createOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: LearningMaterial,
  ): Promise<LearningMaterial> {


    //console.log("came to inside...",dto);

    let lm = await this.base.createOneBase(req, dto);

    dto.learningMaterialsector.map((a) => {
      // let lmtemp = new LearningMaterial();
      //lmtemp.id = lm.id;
      a.learningMaterial2.id = lm.id;
      a.sector.id = dto.learningMaterialsector[0].sector.id;
    });
    try {
      dto.learningMaterialsector.map(async (a) => {
        let lms = await this.LearningMaterialSectorRepo.save(await a);
      });
    } catch (error) {
      console.log(error);
    }


    dto.learningMaterialusertype.map((b) => {
      // let lmtemp = new LearningMaterial();
      //lmtemp.id = lm.id;
      b.learningMaterial.id = lm.id;
      b.userType.id = dto.learningMaterialusertype[0].userType.id;
    });
    try {
      dto.learningMaterialusertype.map(async (b) => {
        b.userid =b.userType.id;
        if(b.userType.id>5){
          b.userType=null;
        }
        
        console.log("+++++++++++++",b)
        let lmus = await this.LearningMaterialUserTypeRepo.save(await b);
      });
    } catch (error) {
      console.log(error);
    }

    return lm;
  }

  @Get("user-type")
  public async getalluserType() {
    return this.typeService.getdatails()
    // return details
  }

  @Get("sector")
  public async getallsector() {
    return this.sectorService.getdatails();
    // return details
  }



}
