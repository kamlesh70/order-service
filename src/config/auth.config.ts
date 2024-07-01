import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    JWKS_URI: process.env.JWKS_URI,
  };
});
