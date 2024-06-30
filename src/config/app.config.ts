import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    PORT: process.env.PORT,
  };
});
