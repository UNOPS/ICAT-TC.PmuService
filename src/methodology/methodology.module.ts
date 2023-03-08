import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicator } from 'src/indicator/indicator.entity';
import { Methodology } from './entity/methodology.entity';
import { MethodologyController } from './methodology.controller';
import { MethodologyService } from './methodology.service';

@Module({
    imports: [TypeOrmModule.forFeature([Methodology,Indicator])],
  controllers: [MethodologyController],
  providers: [MethodologyService],
  exports: [MethodologyService],
})
export class MethodologyModule {}
