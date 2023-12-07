import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('deploy')
  deploy(){
    exec('sh /home/ubuntu/code/pmu-deploy.sh',
        (error, stdout, stderr) => {
            if (error !== null) {
            }
        });       

    return true;

  }

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
