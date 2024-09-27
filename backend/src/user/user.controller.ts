import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  validateOrReject,
} from 'class-validator';

class signUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

@Controller('user')
export class UserController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  @Post('sign-up')
  async signUp(@Body() signupdto: signUpDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: signupdto.email },
      });
      if (existingUser) {
        return { message: 'user Already Registred' };
      }
      const { email, password, name } = signupdto;
      await this.prisma.user.create({ data: { email, password, name } });

      return { message: 'User successfully registered' };
    } catch (errors) {
      throw new BadRequestException(errors);
    }
  }
  @Post('update-password')
  async updatePassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      await this.prisma.user.update({ where: { email }, data: { password } });

      return { message: 'password successfully updated' };
    } catch (error) {
      return { message: 'Unknow Error Occurred' };
    }
  }
}
