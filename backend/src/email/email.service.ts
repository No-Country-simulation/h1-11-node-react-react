import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
      },
    });
  }

  async sendEmail(options: { to: string, subject: string, html: string }) {
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
