import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL!
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN!

if (!redisUrl || !redisToken) {
  throw new Error('Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN')
}

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
})

// Example utilities (optional)
// export const getUpcomingLaunches = async () => {
//   const data = await redis.get('launches:upcoming')
//   return data
// }
// export const setUpcomingLaunches = async (payload: any) => {
//   await redis.set('launches:upcoming', payload, { ex: 300 })
// }
