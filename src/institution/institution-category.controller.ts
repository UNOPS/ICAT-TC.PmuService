import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { InstitutionCategoryService } from './institution-category.service';
import { InstitutionCategory } from './institution.category.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from 'src/auth/guards/roles.guard';
import { UserTypeNames } from 'src/user-type/user-types-names';


@Crud({
    model: {
        type: InstitutionCategory,
    },
})
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserTypeNames.PMUAdmin, UserTypeNames.CountryAdmin)
@Controller('institution-category')
export class InstitutionCategoryController implements CrudController<InstitutionCategory> {
    constructor(public service: InstitutionCategoryService) { }
}
