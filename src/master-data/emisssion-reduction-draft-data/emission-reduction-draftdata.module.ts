import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmissionReductionDraftdataController } from './emission-reduction-draftdata.controller';
import { EmissionReductionDraftdataService } from './emission-reduction-draftdata.service';
import { EmissionReductioDraftDataEntity } from './entity/emission-reductio-draft-data.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EmissionReductioDraftDataEntity])],
  controllers: [EmissionReductionDraftdataController],
  providers: [EmissionReductionDraftdataService],
  exports: [EmissionReductionDraftdataService],
})
export class EmissionReductionDraftdataModule {}
