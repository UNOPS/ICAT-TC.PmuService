import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { Audit } from './entity/audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audit, User])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService]
})
export class AuditModule {

}
