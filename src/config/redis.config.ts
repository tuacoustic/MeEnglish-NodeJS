import Redis from 'ioredis';
import configuration from './configuration';

// Import redis
export const redis = new Redis({
    port: configuration().redisPort,
    host: configuration().redisHost,
    db: configuration().redisDB,
});