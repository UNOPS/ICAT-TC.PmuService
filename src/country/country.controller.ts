import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { CountryService } from './country.service';
import { Country } from './entity/country.entity';

@Crud({
  model: {
    type: Country,
  },
  query: {
    join: {
      countrysector: {
        eager: true,
      },
      sector: {
        eager: true,
      },
      institution: {
        eager: true,
      }
    },
  },
})

@Controller('country')
export class CountryController implements CrudController<Country>{

  constructor(
    public service: CountryService,
    @InjectRepository(Country)
    public CountryRepo: Repository<Country>,
    private readonly auditService: AuditService,


  ) { }

  get base(): CrudController<Country> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  async updateOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Country,
  ) {
    let coun_sec = dto.countrysector;

    let coun = await this.base.updateOneBase(req, dto);

   
    return coun;
  }


  @UseGuards(JwtAuthGuard)
  @Override()
  async createOne(
    @Request() request,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Country,
  ): Promise<Country> {

    dto.isSystemUse = true;

    var x: number = 0;
    dto.countrysector.map((a) => {

      a.country.id = dto.id;
      a.sector.id = dto.countrysector[x].sector.id
      x++;

    });


    try {
      dto.countrysector.map(async (a) => {
      });
    } catch (error) {
    }

    let coun = await this.base.createOneBase(req, dto);

    let audit: AuditDto = new AuditDto();
    audit.action = coun.name + ' Country Activated';
    audit.comment = "Country Activated";
    audit.actionStatus = 'Activated';
    this.auditService.create(audit);
    return coun;
  }

  @Get('country1')
  async getCountry(
    @Query('countryId') countryId: number,
  ): Promise<any> {
    return await this.service.getCountry(countryId);
  }


  @Get('country-sector')
  async getCountrySector(): Promise<any>{

  }

}
