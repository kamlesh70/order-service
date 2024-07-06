import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PriceTypeEnum } from 'src/constants';

export type ProductCacheDocument = HydratedDocument<ProductCache>;

const priceConfigurationSchema = new mongoose.Schema({
  priceType: {
    type: String,
    required: true,
    enum: PriceTypeEnum,
  },
  availableOptions: {
    type: Map,
    of: Number,
    required: true,
  },
});

@Schema({
  timestamps: true,
})
export class ProductCache {
  @Prop({
    type: String,
    required: true,
  })
  product_id: number;

  @Prop(
    raw({
      type: Map,
      of: priceConfigurationSchema,
      required: true,
    }),
  )
  priceConfigurations: any;
}

export const ProductCacheSchema = SchemaFactory.createForClass(ProductCache);
