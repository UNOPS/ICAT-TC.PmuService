import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InstitutionCategoryService } from './institution-category.service';
import { InstitutionCategory } from './institution.category.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Crud({
    model: {
        type: InstitutionCategory,
    },
})
@UseGuards(JwtAuthGuard)
@Controller('institution-category')
export class InstitutionCategoryController implements CrudController<InstitutionCategory> {
    constructor(public service: InstitutionCategoryService) { }
}
