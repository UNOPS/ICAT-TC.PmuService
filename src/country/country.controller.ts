import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { CountryService } from './country.service';
import { CountrySector } from './entity/country-sector.entity';
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
    @InjectRepository(CountrySector)
    public CountrySectorRepo: Repository<CountrySector>,
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
    // console.log('connn',dto.countrysector)
    let coun_sec = dto.countrysector;

    let old_countrysector = (await this.CountryRepo.findOne(dto.id)).countrysector;

    // console.log("++++",old_countrysector)
    let sec = old_countrysector.filter((a) => !coun_sec.some((b) => a.sectorId == b.sector.id));
    // console.log("++",sec)

    sec.forEach((a) => this.CountrySectorRepo.delete(a.id));
    let coun = await this.base.updateOneBase(req, dto);
    coun_sec.forEach((a) => { a.countryId = dto.id, this.CountrySectorRepo.save(a) })

   
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

    var x: number = 0
    console.log('connn', dto)
    dto.countrysector.map((a) => {

      a.country.id = dto.id;
      a.sector.id = dto.countrysector[x].sector.id
      x++;

    });


    try {
      dto.countrysector.map(async (a) => {
        let lms = await this.CountrySectorRepo.save(await a);
      });
    } catch (error) {
      console.log(error);
    }

    let coun = await this.base.createOneBase(req, dto);

    let audit: AuditDto = new AuditDto();
    audit.action = coun.name + ' Country Activated';
    audit.comment = "Country Activated";
    audit.actionStatus = 'Activated';
    this.auditService.create(audit);
    // console.log("audit.......", audit);


    // console.log("act-country===", coun)
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

    return this.CountrySectorRepo.find();
  }

}
