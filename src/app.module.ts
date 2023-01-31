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
import { SubSector } from './master-data/sub-sector/entity/sub-sector.entity'
import { Project } from './project/entity/project.entity';
import { NdcModule } from './master-data/ndc/ndc.module';
import * as ormconfig from './ormconfig';
import { Country } from './country/entity/country.entity';
import { NdcSet } from './master-data/ndc/ndc-set.entity';
import { CountryModule } from './country/country.module';
import { NdcSetService } from './master-data/ndc/ndc-set.service';
import { NdcService } from './master-data/ndc/ndc.service';
import { SectorModule } from './master-data/sector/sector.module';
import { ProjectOwner } from './master-data/project-owner/projeect-owner.entity';

import { FinancingSchemeController } from './master-data/financing-scheme/financing-scheme.controller';
import { FinancingSchemeModule } from './master-data/financing-scheme/financing-scheme.module';
import { DocumentModule } from './document/document.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SectorController } from './master-data/sector/sector.controller';
import { ProjectOwnerModule } from './master-data/project-owner/project-owner.module';
import { ProjectStatusModule } from './master-data/project-status/project-status.module';
import { ConfigModule } from '@nestjs/config';
import { MitigationActionType } from './master-data/mitigation-action/mitigation-action.entity';
import { MitigationActionModule } from './master-data/mitigation-action/mitigation-action.module';
import { ProjectModule } from './project/project.module';
import { MethodologyModule } from './methodology/methodology.module';
import { MethodologyController } from './methodology/methodology.controller';
import { ProjectApprovalStatusModule } from './master-data/project-approval-status/project-approval-status.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InstitutionModule } from './institution/institution.module';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';
import { InstitutionCategoryController } from './institution/institution-category.controller';
import { InstitutionCategoryService } from './institution/institution-category.service';
import { UserTypeModule } from './master-data/user-type/user-type.module';
import { EmissionReductionDraftdataService } from './master-data/emisssion-reduction-draft-data/emission-reduction-draftdata.service';
import { EmissionReductionDraftdataController } from './master-data/emisssion-reduction-draft-data/emission-reduction-draftdata.controller';
import { EmissionReductionDraftdataModule } from './master-data/emisssion-reduction-draft-data/emission-reduction-draftdata.module';
import { EmissionReductioDraftDataEntity } from './master-data/emisssion-reduction-draft-data/entity/emission-reductio-draft-data.entity';
import { LearningMaterialModule } from './learning-material/learning-material.module';
import { SubSectorController } from './master-data/sub-sector/sub-sector.controller';
import { SubSectorService } from './master-data/sub-sector/sub-sector.service';
import { SubSectorModule } from './master-data/sub-sector/sub-sector.module';
import { ReportModule } from './report/report.module';
import { ReportController } from './report/report.controller';
import { ApplicabilityModule } from './master-data/applicability/applicability.module';
import { ApplicabilityController } from './master-data/applicability/applicability.controller';
import { MethodologyDataModule } from './master-data/methodology-data/methodology-data.module';
import { MethodologyDataController } from './master-data/methodology-data/methodology-data.controller';


@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forRoot(ormconfig),
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static-files'),
      renderPath: 'icatcountryportal',
      exclude: ['/api*'],
      serveStaticOptions: { index: false },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport:{
        host: 'smtp.office365.com', 
        port:587,
       secure: false, 
       
       auth: {
        user: "no-reply-icat-ca-tool@climatesi.com",
        pass: "ICAT2022tool",

      },
        // 'smtp://janiya.rolfson49@ethereal.email:T8pnMS7xzzX7k3QSkM@ethereal.email',
      },
      defaults: {
        from: '"Admin" <no-reply-icat-ca-tool@climatesi.com>',
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
    // InstitutionCategoryController,
    // UserController,
  ],
  providers: [AppService],
})
export class AppModule {}
