import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApplicabilityService } from './applicability.service';
import { ApplicabilityEntity } from './applicability.entity';

@Crud({
  model: {
    type: ApplicabilityEntity,
  },
  query: {},
})
@Controller('applicability')
export class ApplicabilityController
  implements CrudController<ApplicabilityEntity>
{
  constructor(public service: ApplicabilityService) {}

  get base(): CrudController<ApplicabilityEntity> {
    return this;
  }
}
