import { Injectable } from '@nestjs/common';
export type User = any;
import { PrismaClient } from '@prisma/client';
@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
