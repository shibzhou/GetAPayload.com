// pages/api/launches.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '../../lib/redis'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cached = await redis.get('launches:upcoming')

  if (typeof cached === 'string') {
    // Now cached is narrowed to string
    const launches = JSON.parse(cached)
    return res.status(200).json(launches)
  }

  // Fallback to API fetch…
  const response = await axios.get('https://lldev.thespacedevs.com/2.0.0/launch/upcoming/', {
    params: { limit: 100, mode: 'list' }
  })
  const launches = response.data.results
  await redis.set('launches:upcoming', JSON.stringify(launches), { ex: 300 })
  return res.status(200).json(launches)
}
