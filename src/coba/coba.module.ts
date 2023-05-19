import { Module } from '@nestjs/common';
import { CobaService } from './coba.service';
import { CobaController } from './coba.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { coba } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([coba])],
  controllers: [CobaController],
  providers: [CobaService]
})
export class CobaModule {}
