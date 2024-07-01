import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import AccessGuard from 'src/guards/authGuard';
import { UserFromRequest } from 'src/types';
import { CustomerService } from './customer.service';
import { User } from 'src/decorators/user.decorator';
import { addAddressDTO } from './dto/AddAddress.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/')
  @UseGuards(AccessGuard)
  getCustomer(@User() user: UserFromRequest) {
    return this.customerService.getCustomer(user);
  }

  @Patch('/add-address/:id')
  @UseGuards(AccessGuard)
  addAddress(
    @Param('id') customerId: string,
    @Body() address: addAddressDTO,
    @User() user: UserFromRequest,
  ) {
    return this.customerService.addAddress(customerId, address, user);
  }
}
