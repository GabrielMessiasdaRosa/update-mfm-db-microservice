import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCardsDataController } from './update-cards-data.controller';
import { UpdateCardsDataService } from './update-cards-data.service';

@Module({
  imports: [],
  controllers: [UpdateCardsDataController],
  providers: [UpdateCardsDataService, PrismaService],
})
export class UpdateCardsDataModule {}
