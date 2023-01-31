import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from 'src/audit/audit.service';
import { Audit } from 'src/audit/entity/audit.entity';
import { User } from 'src/users/user.entity';
import { SubSector } from '../sub-sector/entity/sub-sector.entity';
import { SectorController } from './sector.controller';
import { Sector } from './sector.entity';
import { SectorService } from './sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sector,SubSector,Audit,User])],
  controllers: [SectorController],
  providers: [SectorService,SubSector,AuditService],
  exports: [SectorService],
})
export class SectorModule {}
