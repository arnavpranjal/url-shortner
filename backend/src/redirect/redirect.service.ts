import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
@Injectable()
export class RedirectService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async redirect(shortcode: string, res: Response): Promise<void> {
    try {
      const url = await this.prisma.url.findUnique({
        where: { shortCode: shortcode },
      });

      console.log(url);
      console.log('kl;');

      if (!url) {
        console.log('djd');

        return res
          .status(404)
          .render('not-found', { message: 'Shortcode not found' });
      }
      if (url?.isActive === false) {
        console.log('akask');
        return res.status(410).render('inactive-link', {
          message: 'This link is no longer active',
        });
      }

      await this.prisma.url.update({
        data: { Clicks: { increment: 1 } },
        where: { shortCode: shortcode },
      });

      return res.redirect(301, url.originalUrl);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .render('error', { message: 'An unexpected error occurred' });
    }
  }
}
