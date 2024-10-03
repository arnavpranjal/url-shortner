import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UrlModule } from './url/url.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [EmailModule, ConfigModule.forRoot(), UserModule, AuthModule, UrlModule, RedirectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
