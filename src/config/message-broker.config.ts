import { registerAs } from '@nestjs/config';

export default registerAs('messageBroker', () => {
  return {
    CLIENT_ID: process.env.CLIENT_ID,
    BROKERS: process.env.BROKERS?.split(','),
    GROUP_ID: process.env.GROUP_ID,
    TOPICS: process.env.TOPICS?.split(','),
  };
});
