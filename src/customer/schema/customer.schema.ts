import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Address {
  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  isDefault: boolean;
}

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: [Address],
    required: false,
    default: [],
    _id: false,
  })
  address: [Address];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
