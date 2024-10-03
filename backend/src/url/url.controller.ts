import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UrlService } from './url.service';
import { AuthGuard } from 'src/auth/auth.guard';

class createUrlDto {
  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @IsOptional()
  @IsNumber()
  id?: number | null;
}

@Controller('url')
export class UrlController {
  private prisma: PrismaClient;

  constructor(private urlService: UrlService) {
    this.prisma = new PrismaClient();
  }

  @Post('create')
  async createUrl(@Body() createurlDto: createUrlDto) {
    return await this.urlService.createUrl(
      createurlDto.originalUrl,
      createurlDto.id,
    );
  }

  @Get('get/:id?')
  async getUrl(@Param('id') id: string) {
    const numericId = id ? parseInt(id, 10) : null;

    return await this.urlService.getUrl(numericId);
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteUrl(@Param('id') id: string) {
    const numericId = parseInt(id, 10);

    return await this.urlService.deleteUrl(numericId);
  }

  @UseGuards(AuthGuard)
  @Put('toggle/:id')
  async toggleStatus(@Param('id') id: string) {
    const numericId = parseInt(id, 10);

    return await this.urlService.toggleStatus(numericId);
  }
}
