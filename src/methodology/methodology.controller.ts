import { Controller, Get, Query, Request} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Methodology } from './entity/methodology.entity';
import { MethodologyService } from './methodology.service';

@Crud({
    model: {
      type: Methodology,
    },
    query: {
      join: {
        country: {
          eager: true,
        },
        mitigationActionType: {
          eager: true,
        },
        applicability: {
          eager: true,
        },
        sector: {
          eager: true,
        },
        method: {
          eager: true,
        },
        indicator: {
          eager: true,
        },
    },
},
})

@Controller('methodology')
export class MethodologyController implements CrudController<Methodology>{
    constructor(public service: MethodologyService) {}

    get base(): CrudController<Methodology> {
        return this;
      }

      
  @Get(
    'methodology/methodologyinfo/:page/:limit/:indicatorId/:filterText/:developedBy',
  )
  async getMethoDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('indicatorId') indicatorId:number,
    @Query('developedBy') developedBy:string,
  ): Promise<any>{
    return await this.service.getMethodologyDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      indicatorId,
      developedBy,
    );
  }

    
}
