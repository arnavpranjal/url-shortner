import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
@Injectable()
@Controller('email')
export class EmailController {
  private transporter: nodemailer.Transporter;
  private prisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.prisma = new PrismaClient();
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  @Post('send-code')
  async sendCode(@Body('email') email: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Your Verification Code',
      text: `Your 4-digit verification code is: ${code}`,
    };
    try {
      await this.transporter.sendMail(mailOptions);

      const existingOtp = await this.prisma.otp.findUnique({
        where: { email },
      });

      if (existingOtp) {
        await this.prisma.otp.update({ where: { email }, data: { code } });
      } else {
        await this.prisma.otp.create({ data: { email, code } });
      }
      return { message: 'Code sent successfully' };
    } catch (error) {
      return { message: 'Failed to send code', error: error.message };
    }
  }

  @Post('verify-code')
  async verfiyCode(@Body('value') code: string, @Body('email') email: string) {
    try {
      console.log(code);
      const oldUser = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (oldUser) {
        return { message: 'User with email already exists' };
      }
      const generateCode = await this.prisma.otp.findUnique({
        where: { email },
      });
      console.log(generateCode);
      if (!generateCode) {
        return { message: 'email not registered' };
      }
      if (generateCode.code == code) {
        return { message: 'email verified', email: email };
      } else {
        return { message: 'wrong code' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
  @Post('send-code-password-reset')
  async sendCodePasswordReset(@Body('email') email: string) {
    const oldUser = await this.prisma.user.findUnique({ where: { email } });
    if (!oldUser) {
      return { message: 'Not a registered Email' };
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Your Verification Code',
      text: `Your 4-digit verification code is: ${code}`,
    };
    try {
      await this.transporter.sendMail(mailOptions);

      const existingOtp = await this.prisma.otp.findUnique({
        where: { email },
      });

      if (existingOtp) {
        await this.prisma.otp.update({ where: { email }, data: { code } });
      } else {
        await this.prisma.otp.create({ data: { email, code } });
      }
      return { message: 'Code sent successfully' };
    } catch (error) {
      return { message: 'Failed to send code', error: error.message };
    }
  }
  @Post('verify-code-password-reset')
  async verfiyCodePasswordReset(
    @Body('value') code: string,
    @Body('email') email: string,
  ) {
    try {
      console.log(code);

      const generateCode = await this.prisma.otp.findUnique({
        where: { email },
      });

      if (generateCode.code == code) {
        return { message: 'Email Verified', email: email };
      } else {
        return { message: 'wrong code' };
      }
    } catch (error) {
      return { message: error.message };
    }
  }
}
