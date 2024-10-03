import { Controller, Get, Param, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Response } from 'express';
@Controller('')
export class RedirectController {
  constructor(private redirectService: RedirectService) {}

  @Get('/:shortcode')
  async redirect(@Param('shortcode') shortcode: string, @Res() res: Response) {
    console.log(shortcode);
    return await this.redirectService.redirect(shortcode, res);
  }
}
