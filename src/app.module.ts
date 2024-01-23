import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditModule } from './audit/audit.module';
import { Audit } from './audit/entity/audit.entity';
import { ClimateChangeDataCategory } from './master-data/cimate-change-data-category/climate.change.data.category.entity';
import { Ndc } from './master-data/ndc/ndc.entity';
import { SubNdc } from './master-data/ndc/sub-ndc.entity';
import { ProjectStatus } from './master-data/project-status/project-status.entity';
import { Sector } from './master-data/sector/sector.entity';
import { Indicator } from './master-data/indicator/entities/indicator.entity';
import { SubSector } from './master-data/sub-sector/entity/sub-sector.entity'
import { Project } from './project/entity/project.entity';
import { NdcModule } from './master-data/ndc/ndc.module';
import * as ormconfig from './ormconfig';
import { Country } from './country/entity/country.entity';
import { NdcSet } from './master-data/ndc/ndc-set.entity';
import { CountryModule } from './country/country.module';
import { SectorModule } from './master-data/sector/sector.module';
import { ProjectOwner } from './master-data/project-owner/projeect-owner.entity';

import { FinancingSchemeController } from './master-data/financing-scheme/financing-scheme.controller';
import { FinancingSchemeModule } from './master-data/financing-scheme/financing-scheme.module';
import { DocumentModule } from './document/document.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProjectOwnerModule } from './master-data/project-owner/project-owner.module';
import { ProjectStatusModule } from './master-data/project-status/project-status.module';
import { ConfigModule } from '@nestjs/config';
import { MitigationActionModule } from './master-data/mitigation-action/mitigation-action.module';
import { ProjectModule } from './project/project.module';
import { MethodologyModule } from './methodology/methodology.module';
import { MethodologyController } from './methodology/methodology.controller';
import { ProjectApprovalStatusModule } from './master-data/project-approval-status/project-approval-status.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InstitutionModule } from './institution/institution.module';
import { UserTypeModule } from './master-data/user-type/user-type.module';
import { EmissionReductionDraftdataController } from './master-data/emisssion-reduction-draft-data/emission-reduction-draftdata.controller';
import { EmissionReductionDraftdataModule } from './master-data/emisssion-reduction-draft-data/emission-reduction-draftdata.module';
import { EmissionReductioDraftDataEntity } from './master-data/emisssion-reduction-draft-data/entity/emission-reductio-draft-data.entity';
import { LearningMaterialModule } from './learning-material/learning-material.module';
import { SubSectorController } from './master-data/sub-sector/sub-sector.controller';
import { SubSectorModule } from './master-data/sub-sector/sub-sector.module';
import { ReportModule } from './report/report.module';
import { ReportController } from './report/report.controller';
import { ApplicabilityModule } from './master-data/applicability/applicability.module';
import { ApplicabilityController } from './master-data/applicability/applicability.controller';
import { MethodologyDataModule } from './master-data/methodology-data/methodology-data.module';
import { MethodologyDataController } from './master-data/methodology-data/methodology-data.controller';
import { IndicatorController } from './indicator/indicator.controller';
import { IndicatorModule } from './master-data/indicator/indicator.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuditModule,
    TypeOrmModule.forFeature([
      Audit,
      Project,
      ProjectStatus,
      ProjectOwner,
      SubNdc,
      Ndc,
      Sector,
      SubSector,
      ClimateChangeDataCategory,
      Country,
      NdcSet,
      EmissionReductioDraftDataEntity,
      Indicator
    ]),

    ProjectModule,
    AuditModule,
    CountryModule,
    NdcModule,
    MitigationActionModule,
    ProjectOwnerModule,
    SectorModule,
    ProjectStatusModule,
    FinancingSchemeModule,
    MethodologyDataModule,
    DocumentModule,
    AuthModule,
    UsersModule,
    InstitutionModule,
    IndicatorModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static-files'),
      renderPath: 'icatcountryportal',
      exclude: ['/api*'],
      serveStaticOptions: { index: false },
    }),
   
    
    MailerModule.forRoot({
      transport:{
        host: process.env.EMAIL_HOST, 
        port:587,
       secure: false, 
       
       auth: {
        user: process.env.EMAIL,
          pass:  process.env.EMAIL_PASSWORD,

      },
      },
      defaults: {
        from: process.env.EMAIL,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MethodologyModule,
    ApplicabilityModule,
    ProjectApprovalStatusModule,
    UserTypeModule,
    EmissionReductionDraftdataModule,
    LearningMaterialModule,
    SubSectorModule,
    ReportModule,
    IndicatorModule,
 
  ],
  controllers: [
    AppController,
    FinancingSchemeController,
    FinancingSchemeController,
    MethodologyDataController,
    MethodologyController,

    EmissionReductionDraftdataController,

    SubSectorController,
    ReportController,

    ApplicabilityController,

    IndicatorController,
  ],
  providers: [AppService],
})
export class AppModule {}
