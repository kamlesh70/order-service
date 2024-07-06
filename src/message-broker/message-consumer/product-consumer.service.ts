import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCache } from 'src/shared/schema/product-cache.schema';

export class ProductConsumerService {
  constructor(
    @InjectModel(ProductCache.name)
    private productCacheModel: Model<ProductCache>,
  ) {}

  async createProductCache(message: string, topic: string, partition: number) {
    try {
      const brokerMessage = JSON.parse(message);
      const productCache = new ProductCache();
      productCache.product_id = brokerMessage.id;
      productCache.priceConfigurations = brokerMessage.priceConfigurations;
      await this.productCacheModel.updateOne(
        { product_id: brokerMessage?.id },
        productCache,
        { upsert: true },
      );
      console.log('Product cache created successfully', topic, partition);
    } catch (error) {
      console.log('Product cache error', error);
    }
  }
}
