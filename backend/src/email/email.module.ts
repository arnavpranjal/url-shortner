import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
})
export class EmailModule {}
