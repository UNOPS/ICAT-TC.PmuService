import { Module } from '@nestjs/common';
import { IndicatorService } from './indicator.service';

@Module({
  providers: [IndicatorService]
})
export class IndicatorModule {}
