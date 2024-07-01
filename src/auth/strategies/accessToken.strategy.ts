import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import * as jwkClient from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwkClient.expressJwtSecret({
      //   jwksUri:
      //     configService.get('auth.JWKS_URI') ||
      //     'http://localhost:8081/.well-known/jwks.json',
      //   cache: false,
      //   rateLimit: false,
      // }) as jwkClient.GetVerificationKey | jwkClient.SecretCallbackLong,

      secretOrKey: process.env.PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    const { sub, role, firstName, lastName, email } = payload;
    return {
      sub,
      role,
      firstName,
      lastName,
      email,
    };
  }
}
