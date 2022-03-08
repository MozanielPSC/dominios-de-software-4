import { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '../../../errors/AppError';

export default async function rateLimiter(request: Request, response: Response, next: NextFunction) {
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  await redisClient.connect();
  const Limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10,
    duration: 1
  });
  try {
    await Limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError("Too many requests", 429)
  }
}
