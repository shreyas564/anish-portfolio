import Redis from 'ioredis';
import { Redis as UpstashRedis } from '@upstash/redis';

let redisClient = null;

export function getRedis() {
  if (redisClient) return redisClient;

  // 1. Check for standard Redis URI (Redis Cloud / Heroku Redis etc)
  if (process.env.REDIS_URL) {
    redisClient = {
      type: 'ioredis',
      client: new Redis(process.env.REDIS_URL),
    };
    return redisClient;
  }

  // 2. Check for Upstash Redis / Vercel KV REST API
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  
  if (upstashUrl && upstashToken) {
    redisClient = {
      type: 'upstash',
      client: new UpstashRedis({ url: upstashUrl, token: upstashToken }),
    };
    return redisClient;
  }

  return null;
}

export async function getPortfolioContent() {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const data = await redis.client.get('portfolio_content');
    if (!data) return null;

    // Upstash automatically parses JSON, ioredis returns string
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (err) {
    console.error('Error fetching from Redis:', err);
    return null;
  }
}

export async function setPortfolioContent(content) {
  const redis = getRedis();
  if (!redis) return false;

  try {
    if (redis.type === 'ioredis') {
      await redis.client.set('portfolio_content', JSON.stringify(content));
    } else {
      await redis.client.set('portfolio_content', content);
    }
    return true;
  } catch (err) {
    console.error('Error saving to Redis:', err);
    return false;
  }
}
