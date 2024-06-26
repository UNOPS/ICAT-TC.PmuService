import { Controller } from '@nestjs/common';
import { Ndc } from './ndc.entity';
import { NdcService } from './ndc.service';
import { Request, } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  ParsedRequest,
  CrudRequest,
  GetManyDefaultResponse,
} from '@nestjsx/crud';

@Crud({
  model: {
    type: Ndc,
  },
  query: {
    join: {
      set: {
        eager: true,
      },
      country: {
        eager: true,
      },
      sector: {
        eager: true,
      },
      subNdc: {
        eager: true,
      },
    },
  },
})
@Controller('ndc')
export class NdcController implements CrudController<Ndc> {
  constructor(public service: NdcService) {}

  get base(): CrudController<Ndc> {
    return this;
  }

  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
    @Request() req2,
  ): Promise<GetManyDefaultResponse<Ndc> | Ndc[]> {
    try {
      let res = await this.base.getManyBase(req);
      return res;
    } catch (error) {
    }
  }
}
