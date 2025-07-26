import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import { Repository } from 'typeorm-next';
import { InstitutionTypeService } from './institution-type.service';
import { InstitutionType } from './institution.type.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from 'src/auth/guards/roles.guard';
import { UserTypeNames } from 'src/user-type/user-types-names';

@Crud({
    model: {
        type: InstitutionType,
    },
    query: {
        join: {
            institution: {
                eager: true,
            },
        },
    },
})

@Controller('institution-type')
export class InstitutionTypeController implements CrudController<InstitutionType> {
    constructor(public service: InstitutionTypeService,
        @InjectRepository(InstitutionType)
        private readonly institutionTypeRepository: Repository<InstitutionType>) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserTypeNames.PMUAdmin, UserTypeNames.ICATAdmin)
    @Get('institutionTypeByUserType')
    async findInstitutionTypeByUserType(
        @Query('userId') userId: number,
    ): Promise<any> {
        return await this.service
            .getInstitutionTypesByUser(userId)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserTypeNames.PMUAdmin, UserTypeNames.ICATAdmin)
    @Get('type')
    async getAllCo(): Promise<any> {
        return this.service.type()
    }
}
