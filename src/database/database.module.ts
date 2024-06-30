import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
  ],
  providers: [MongooseService],
})
export class DatabaseModule {}
