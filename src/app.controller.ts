import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ProductionDisabledGuard } from './auth/guards/production-disabled.guard';
import { UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @SkipThrottle()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ProductionDisabledGuard)
  @Get('deploy')
  deploy(){
    exec('sh /home/ubuntu/code/pmu-deploy.sh',
        (error, stdout, stderr) => {
            if (error !== null) {
            }
        });       

    return true;

  }

  @UseGuards(ProductionDisabledGuard)
  @Get('deloyweb')
  deloyweb(){
    exec('sh /home/ubuntu/code/pmu-web-deploy.sh',
        (error, stdout, stderr) => {
            if (error !== null) {
            }
        });       

    return true;

  }
}
