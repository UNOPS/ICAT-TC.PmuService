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
    console.log("deloying the main main main service ---------------------------------")
    exec('sh /home/ubuntu/code/pmu-deploy.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });       

    return true;

  }

  @Get('deloyweb')
  deloyweb(){
    console.log("deloying the FE ---------------------------------")
    exec('sh /home/ubuntu/code/pmu-web-deploy.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });       

    return true;

  }
}
