import nodemailer from 'nodemailer';

import { SMTP_CONFIG } from '@constants';

class MailingService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(SMTP_CONFIG);
  }

  async sendResetPasswordLink(to: string, link: string) {
    await this.transporter.sendMail({
      to,
      subject: 'TODO APP - Reset password link',
      html: `
      <div> 
        <h3>Here is your reset password link:</h3>
        <a href=${link}>Reset password link</a>
      </div>
      `,
    });
  }
}

export const mailer = new MailingService();
