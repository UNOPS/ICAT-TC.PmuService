import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { SubSector } from '../sub-sector/entity/sub-sector.entity';
import { Sector } from './sector.entity';
import { SectorService } from './sector.service';

@Crud({
  model: {
    type: Sector,
  },
  query: {
    join: {
      climateChangeDataCategory: {
        eager: true,
      },
      country: {
        eager: true,
      },
      SubSector: {
        eager: true,
      },
    },
  },
})
@Controller('sector')
export class SectorController implements CrudController<Sector> {

  constructor(
    
    public service: SectorService,
    @InjectRepository(SubSector)
    public SubSectorRepo: Repository<SubSector>,

    private readonly auditService: AuditService,

    ) {}

  get base(): CrudController<Sector> {
    return this;
  }

  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
    @Request() req2,
  ): Promise<GetManyDefaultResponse<Sector> | Sector[]> {
    try {
      let res = await this.base.getManyBase(req);
      // console.log('*********************************************');
      // console.log(res);
      // console.log('*********************************************');
      // console.log(req);
      return res;
    } catch (error) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(error);
    }
  }


@Get(
  'sector/sectorinfo/:page/:limit/:filterText', 
  )
  async getSectorDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    
  ): Promise<any> {
    // console.log(moment(editedOn).format('YYYY-MM-DD'))
    return await this.service.getSectorDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      
    );
  }


  @UseGuards(JwtAuthGuard)
  @Override()
  async createOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Sector,
  ): Promise<Sector> {
   
     
      //console.log("came to inside...",dto);

      let lm = await this.base.createOneBase(req, dto);
      
      let audit: AuditDto = new AuditDto();
      audit.action = lm.name+' Sector Created';
      audit.comment = "Sector Created";
      audit.actionStatus = 'Created';
      this.auditService.create(audit);
      console.log("audit.......",audit);



      var x:number = 0
        dto.subSector.map((a) => {

           a.name= dto.subSector[x].name;
           a.description = dto.subSector[x].description;
           a.sector.id = lm.id;
           x++;
          
         });
         

         try {
          dto.subSector.map(async (a) => {
            let lms = await this.SubSectorRepo.save(await a);
          });
        } catch (error) {
          console.log(error);
        }

      return lm;
  }






}
