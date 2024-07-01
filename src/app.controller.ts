import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import AccessGuard from './guards/authGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AccessGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
