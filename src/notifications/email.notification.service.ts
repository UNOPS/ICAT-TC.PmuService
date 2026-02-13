import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailNotificationService {
  constructor(private readonly mailerService: MailerService) {}

  from: string = process.env.EMAIL;

  async sendMail(
    to: string,
    subject: string,
    text: string,
    emailTemplate: string = '',
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        from: this.from,
        subject,
        text,
        html: emailTemplate,
      });
      console.log(`Email sent successfully to ${to}: ${subject}`);
    } catch (e) {
      console.error(`Failed to send email to ${to}: ${subject}`, e.message || e);
      throw e;
    }
  }

}
