import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UpdateCardsDataModule } from './update-cards-data/update-cards-data.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UpdateCardsDataModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
