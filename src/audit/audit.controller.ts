import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import * as moment from 'moment';
import { audit } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Repository } from 'typeorm';
import { AuditService } from './audit.service';
import { AuditDto } from './dto/audit-dto';
import { Audit } from './entity/audit.entity';

@Crud({
    model: {
      type: Audit,
    },
    query: {
      join: {
        country: {
          eager: true,
        },
        user: {
          eager: true,
        },
        
      },
    },
  })
@Controller('audit')
export class AuditController implements CrudController<Audit> {
    constructor(public service: AuditService,
      @InjectRepository(Audit)
      private readonly projectRepository: Repository<Audit>,
      public configService: ConfigService,) {}

    get base(): CrudController<Audit> {
        return this;
      }

      @UseGuards(JwtAuthGuard)
      @Post()
      create(@Body() auditDto: AuditDto){
        return this.service.create(auditDto);
      }

      @Get(
        'audit/auditinfo/:page/:limit/:userTypeId/:action/:editedOn/:filterText/:institutionId', 
      )
      async getAuditDetails(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('userTypeId') userTypeId: string,
        @Query('action') action: string,
        @Query('editedOn') editedOn: string,
        @Query('filterText') filterText: string,
        @Query('institutionId') institutionId:number
        
      ): Promise<any> {
        
       //let editedOnnew= moment(editedOn, "DD/MM/YYYY");
       
       var timestamp = Date.parse(editedOn);
      var dateObject = new Date(timestamp);
      
      console.log('jjjjjjfffff',moment(editedOn,'YYYY-MM-DD').format('YYYY-MM-DD'));
      console.log('hhh',editedOn)
        return await this.service.getAuditDetails(
          {
            limit: limit,
            page: page,
          },
          filterText,
          userTypeId,
          action,
          editedOn,
          institutionId
        );

      }
}
