import { Module, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.gaurd';
import { CouponModule } from './coupon/coupon.module';
import { MessageBrokerModule } from './message-broker/message-broker.module';
import messageBrokerConfig from './config/message-broker.config';
import authConfig from './config/auth.config';

@UseGuards(RolesGuard)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, messageBrokerConfig, authConfig],
    }),
    DatabaseModule,
    AuthModule,
    CustomerModule,
    CouponModule,
    MessageBrokerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
