import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialDto } from './Dto/auth.credential.dto';
import { ResetPassword } from './Dto/reset.password.dto';
import { ForgotPasswordDto } from './Dto/forgot.password.dto';
import { EmailNotificationService } from 'src/notifications/email.notification.service';
import { AuditService } from 'src/audit/audit.service';
import { AuditDto } from 'src/audit/dto/audit-dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  username: string;
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private configService: ConfigService,
    private emailService: EmailNotificationService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  audit2: any;

  @Post('auth/login')
  async login(@Body() authCredentialDto: AuthCredentialDto): Promise<any> {
    this.username = authCredentialDto.username;

    let user = await this.userRepo.findOne({
      where: { email: this.username },
    });

    this.audit2 = {
      description: authCredentialDto.username + ' Is Logged',
      userName: authCredentialDto.username,
      actionStatus: 'Logged',
      userType: user.userType.name,
      uuId: user.userType.id,
      institutionId: user.institution.id,
    };

    return await this.authService.login(authCredentialDto);
  }

  @Get('auth/validate-reset-password/:email/:token')
  async validateResetPassword(
    @Param('email') email: string,
    @Param('token') token: string,
    @Res() response: any,
  ): Promise<any> {
    const result = await this.usersService.validateResetPasswordRequest(email, token);

    if (!result.valid) {
      const statusCode = result.expired ? 410 : 400;
      return response.status(statusCode).send({
        status: 0,
        valid: false,
        expired: result.expired || false,
        message: result.message || 'Invalid token',
      });
    }

    return response.status(200).send({
      status: 1,
      valid: true,
      message: 'Token is valid',
    });
  }

  @Put('auth/reset-password')
  async resetPassword(
    @Body() resetPwd: ResetPassword,
    @Res() response: any,
  ): Promise<any> {
    if (resetPwd.token) {
      const validation = await this.usersService.validateResetPasswordRequest(
        resetPwd.email,
        resetPwd.token,
      );

      if (!validation.valid) {
        const statusCode = validation.expired ? 410 : 400;
        return response.status(statusCode).send({
          success: false,
          expired: validation.expired || false,
          message: validation.message || 'Invalid token',
        });
      }
    }

    const result = await this.usersService.resetPassword(resetPwd);

    if (!result.success) {
      const statusCode = result.expired ? 410 : 400;
      return response.status(statusCode).send({
        success: false,
        expired: result.expired || false,
        message: result.message || 'Password reset failed',
      });
    }

    return response.status(200).send({
      success: true,
      message: 'Password reset successful',
    });
  }

  @Post('auth/forgot-password')
  async forgotPassword(
    @Body() forgotparam: ForgotPasswordDto,
    @Res() response: any,
  ): Promise<any> {
    let user = await this.usersService.findUserByEmail(forgotparam.email);

    if (!user) {
      return response.status(400).send({
        status: 0,
        message: 'Invalid Email/User ID',
      });
    }

    const pwdResetToken = uuidv4();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 72);

    await this.usersService.updateChangePasswordToken(user.id, pwdResetToken, tokenExpiration);
    const resetPwdUrl = `${process.env.CLIENT_URL}/reset-password?token=${pwdResetToken}`;

    const emailTemplate = `
      Dear ${user.firstName},<br/><br/>
      We received a request to reset your password.<br/>
      Please <a href="${resetPwdUrl}">click here</a> to reset your password.<br/>
      <strong>Important:</strong> This link will expire in 72 hours.<br/><br/>
      If you did not request this, please ignore this email.
    `;

    await this.emailService.sendMail(
      user.email,
      'Password Reset Request',
      '',
      emailTemplate,
    );

    return response.status(200).send({
      status: 1,
      message: 'Password reset link has been sent to your email.',
    });
  }
}
