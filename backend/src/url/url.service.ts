import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class UrlService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  private readonly characterList =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private getShortCode(): string {
    let result = '';

    for (let i = 0; i < 8; ++i) {
      result += this.characterList.charAt(
        Math.floor(Math.random() * this.characterList.length),
      );
    }

    return result;
  }

  async createUrl(url: string, id: number | null) {
    const shortCode = this.getShortCode();

    let data;
    if (id) {
      data = { originalUrl: url, userId: id, shortCode: shortCode };
    } else {
      data = { originalUrl: url, shortCode: shortCode };
    }

    await this.prisma.url.create({
      data: data,
    });

    return { message: 'Short Url Created', shortcode: shortCode };
  }

  async getUrl(id: number | null) {
    const result = await this.prisma.url.findMany({ where: { userId: id } });

    return result;
  }

  async deleteUrl(id: number) {
    const result = await this.prisma.url.delete({ where: { id: id } });
    return { result, message: 'link deleted successfully' };
  }

  async toggleStatus(id: number) {
    const link = await this.prisma.url.findUnique({ where: { id: id } });
    const newStatus = !link?.isActive;
    const result = await this.prisma.url.update({
      data: { isActive: newStatus },
      where: { id: id },
    });

    return { result, message: 'Link Status Toggled' };
  }
}
