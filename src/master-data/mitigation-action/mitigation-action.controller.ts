import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MitigationActionType } from './mitigation-action.entity';
import { MitigationActionService } from './mitigation-action.service';

@Crud({
  model: {
    type: MitigationActionType,
  },
})
@Controller('mitigation-action')
export class MitigationActionController
  implements CrudController<MitigationActionType>
{
  constructor(public service: MitigationActionService) {}

}
