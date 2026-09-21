import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Usar um bypass caso as credenciais não estejam configuradas no .env
const hasRedisCredentials = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis = hasRedisCredentials 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Cria um rate limiter para geração de questões (ex: 20 gerações por dia)
export const questionsRatelimit = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 d"),
      analytics: true,
      prefix: "@upstash/ratelimit/questions",
    })
  : { limit: async () => ({ success: true }) }; // mock bypass

// Cria um rate limiter para o tutor (ex: 50 mensagens por dia)
export const chatRatelimit = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
      analytics: true,
      prefix: "@upstash/ratelimit/chat",
    })
  : { limit: async () => ({ success: true }) }; // mock bypass
