import { Module } from '@nestjs/common';
import { DictModule } from './dict/dict.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { GpsModule } from './gps/gps.module';

@Module({
  imports: [PrismaModule, HttpModule, DictModule, GpsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
