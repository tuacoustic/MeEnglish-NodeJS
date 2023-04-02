import { Injectable } from "@nestjs/common";
import { redis } from '../../config/redis.config';
import { RedisType } from "../constant";

@Injectable()
export class RedisService {
    constructor(){}

    set(redisData: RedisType): Promise<"OK"> {
        return redis.set(redisData.key, redisData.value, 'EX', redisData.expired);
    }

    setNx(redisData: RedisType): Promise<number> {
        return redis.setnx(redisData.key, redisData.value);
    }

    get(key: string): Promise<string> {
        return redis.get(key);
    }
}