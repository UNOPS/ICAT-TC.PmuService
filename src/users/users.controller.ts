import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Institution } from 'src/institution/institution.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      institution: {
        eager: true,
      },
      userType: {
        eager: true,
      },
      country: {
        eager: true,
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService,

    private readonly auditService: AuditService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {

    let audit: AuditDto = new AuditDto();
    audit.action = createUserDto.firstName +' User Created';
    audit.comment = "User Created";
    audit.actionStatus = 'Created';
    this.auditService.create(audit);

    return this.service.create(createUserDto);

 

  }

  @Patch('changeStatus')
  changeStatus( @Query('id') id:number, @Query('status') status:number): Promise<User> {
   
    return this.service.chnageStatus(id,status);
  }

  @Get('findUserBy')
  async findUserByUserType(@Request() request): Promise<any> {
    
    return await this.service.findUserByUserType();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
  let x = await this.service.findOne({where:{id:Number(id)}});
    return this.service.findOne({where:{id:Number(id)}});
  }

  @Get('isUserAvailable/:userName')
  async isUserAvailable(@Param('userName') userName: string): Promise<boolean> {
    return await this.service.isUserAvailable(userName);
  }

  @Get('findUserByUserName/:userName')
  async findUserByUserName(@Param('userName') userName: string): Promise<any> {

    return await this.service.findUserByUserName(userName);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest, @Request() req2) {
    

    let userList = this.base.getManyBase(req);

    return userList;
  }




  @Get('AllUserDetails/userDetalils/:page/:limit/:filterText/:userTypeId' )
  async allUserDetails(
    @Request() request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filterText') filterText: string,
    @Query('userTypeId') userTypeId: number,
  ): Promise<any>{
    return await this.service
    .getUserDetails(
      {
        limit: limit,
        page: page,
      },
      filterText,
      userTypeId,
    );
  }

  
    
}
