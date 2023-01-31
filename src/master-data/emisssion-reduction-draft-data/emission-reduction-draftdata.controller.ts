import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { EmissionReductionDraftdataService } from './emission-reduction-draftdata.service';
import { EmissionReductioDraftDataEntity } from './entity/emission-reductio-draft-data.entity';


@Crud({
    model: {
      type: EmissionReductioDraftDataEntity,
    },
    query: {
      join: {
        country: {
          eager: true,
        },
        sector: {
          eager: true,
        },
      },
    },
  })
@Controller('emission-reduction-draftdata')
export class EmissionReductionDraftdataController {
    constructor(public service: EmissionReductionDraftdataService) {}

    get base(): CrudController<EmissionReductioDraftDataEntity> {
        return this;
      }
}
