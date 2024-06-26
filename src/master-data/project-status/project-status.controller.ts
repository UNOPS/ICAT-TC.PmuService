import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
} from '@nestjsx/crud';
import { ProjectStatus } from './project-status.entity';
import { ProjectStatusService } from './project-status.service';

@Crud({
  model: {
    type: ProjectStatus,
  },
  query: {
    join: {
    },
  },
})
@Controller('project-status')
export class ProjectStatusController implements CrudController<ProjectStatus> {
  constructor(public service: ProjectStatusService) {}

  get base(): CrudController<ProjectStatus> {
    return this;
  }

}
