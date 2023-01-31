import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { Audit } from 'src/audit/entity/audit.entity';
import { User } from 'src/users/user.entity';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { CountrySector } from './entity/country-sector.entity';
import { Country } from './entity/country.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Country,CountrySector,Audit,User])],
    controllers: [CountryController],
    providers: [CountryService,CountrySector,AuditService],
    exports: [CountryService],
})
export class CountryModule {}
