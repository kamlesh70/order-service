import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schema/customer.schema';
import { Model } from 'mongoose';
import { UserFromRequest } from 'src/types';
import { addAddressDTO } from './dto/AddAddress.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getCustomer(user: UserFromRequest) {
    try {
      const { firstName, lastName, email, sub } = user;
      const customer = await this.customerModel.findOne({
        userId: sub,
      });
      if (customer) {
        return {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          address: customer.address,
          userId: customer.userId,
          _id: customer._id,
        };
      }

      const createdCustomer = await this.customerModel.create({
        firstName,
        lastName,
        email,
        userId: sub,
      });

      return {
        firstName: createdCustomer.firstName,
        lastName: createdCustomer.lastName,
        email: createdCustomer.email,
        userId: createdCustomer.userId,
        address: createdCustomer.address,
        _id: createdCustomer._id,
      };
    } catch (error) {
      throw error;
    }
  }

  async addAddress(
    customerId: string,
    address: addAddressDTO,
    user: UserFromRequest,
  ) {
    try {
      const { sub: userId } = user;
      const customer = await this.customerModel.findOne({
        _id: customerId,
        userId,
      });
      if (!customer) {
        throw new BadRequestException('Customer not found !');
      }
      const exists = customer?.address?.some(
        (ele) => ele.address === address.address,
      );
      if (exists) {
        throw new BadRequestException('Address already exists !');
      }
      await this.customerModel.updateOne(
        {
          _id: customerId,
          userId,
        },
        {
          $push: {
            address: {
              address: address.address,
              isDefault: address.isDefault || false,
            },
          },
        },
      );
      return {
        success: true,
        message: 'Address added successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
