import { Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductCache,
  ProductCacheSchema,
} from 'src/shared/schema/product-cache.schema';
import { ProductConsumerService } from './message-consumer/product-consumer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductCache.name, schema: ProductCacheSchema },
    ]),
  ],
  providers: [MessageBrokerService, ProductConsumerService],
})
export class MessageBrokerModule {}
