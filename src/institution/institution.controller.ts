
import { Controller, Get, Query, Request, UseGuards, Inject } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Institution } from './institution.entity';
import { InstitutionService } from './institution.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Country } from 'src/country/entity/country.entity'
import { Repository } from 'typeorm';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { REQUEST } from '@nestjs/core';

@Crud({
  model: {
    type: Institution,
  },
  query: {
    join: {

      province: {
        eager: true,
      },
      district: {
        eager: true,
      },
      divisionalSecretariat: {
        eager: true,
      },
      parentInstitution: {
        eager: true,
      },
      type: {
        eager: true,
      },
      hierarchy: {
        eager: true,
      },
      countries: {
        eager: true,
      },

    },
  },
})
@Controller('institution')
export class InstitutionController implements CrudController<Institution> {
  constructor(
    public service: InstitutionService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,

    private readonly auditService: AuditService,
    @Inject(REQUEST) private request,

  ) { }


  get base(): CrudController<Institution> {
    return this;
  }

  @Get(
    'institution/institutioninfo/:page/:limit/:filterText/:countryId',
  )
  async getInstiDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('countryId') countryId: number,
  ): Promise<any> {
    return await this.service.getInstitutionDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      countryId

    )

  }
  @Get(
    'institution/institutiId',
  )
  async getInstitutionDetails(
    @Request() request,
    @Query('countryId') insId: number,
  ): Promise<any> {
    return await this.service.getInstitution(
      insId
    )

  }



  @Get(
    'institution/institutioninfopmu',
  )
  async getPmuAdminAssignInstitution(
    @Request() request,

  ): Promise<any> {
    return await this.service.getPmuAdminAssignInstitution(
      {
        limit: 10,
        page: 1,
      },


    )

  }

@Get('allIns')
async getAllIns(){
  return await this.service.findAll();
}

  @Get('deactivateInstituion')
  async deactivateInstitution(
    @Query('instiId') instiId: number,
  ): Promise<any> {
    return await this.service.softDelete(instiId);
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  async createOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Institution,
  ): Promise<Institution> {

    let institution = await this.base.createOneBase(req, dto);

    let audit: AuditDto = new AuditDto();
    audit.action = institution.name + " Institution created";
    audit.comment = "Institution Created";
    audit.actionStatus = 'Created';
    this.auditService.create(audit);

    dto.countries.map((a) => {

      let insttemp = new Institution();
      insttemp.id = institution.id;
      a.institution = insttemp;
    });

    try {
      dto.countries.map(async (a) => {
        let ins = await this.countryRepo.save(await a);
      });
    } catch (error) {
    }

    return institution;
  }

  @Override()
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Institution,
  ): Promise<Institution> {


    let institution = await this.base.updateOneBase(req, dto);
    let newco= new Array();
    for (let n of dto.countries) {
      newco.push(n.id)
    }
  

    let audit: AuditDto = new AuditDto();
    audit.action = institution.name + " Institution Updated";
    audit.comment = "Institution Updated";
    audit.actionStatus = 'Updated';

    await this.auditService.create(audit);

    return institution;

  }

  @Get('get-filtered-institutions')
  async getFilteredInstitution(
    @Query('filter') filter: string,
  ): Promise<any> {
    return await this.service.getFilteredInstitution(filter);
  }


}
