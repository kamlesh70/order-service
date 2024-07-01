import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  controllers: [],
  providers: [AccessTokenStrategy],
})
export class AuthModule {}
