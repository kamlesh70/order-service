import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema()
export class Coupon {
  @Prop({
    type: String,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
  })
  code: string;

  @Prop({
    type: Date,
  })
  validateUpTo: Date;

  @Prop({
    type: String,
  })
  tenantId: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
