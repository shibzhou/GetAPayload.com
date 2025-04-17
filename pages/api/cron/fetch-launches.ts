import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { redis } from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Fetch upcoming launches from Launch Library 2
  const response = await axios.get('https://lldev.thespacedevs.com/2.0.0/launch/upcoming/', {
    params: { limit: 100, mode: 'list' }
  })  // :contentReference[oaicite:5]{index=5}

  const raw = response.data.results
  const launches = raw
    .filter(l => typeof l.net === 'string' && l.net)
    .map(l => ({
      id: l.id,
      date: l.net,           // ← use the ISO timestamp from `net`
      name: l.name 
      // status: /* your mapping logic */,
    }))

  // 2. Cache full list in Redis for 5 minutes
  await redis.set('launches:upcoming', JSON.stringify(launches), { ex: 300 })  // :contentReference[oaicite:6]{index=6}

  // 3. Publish updates for real-time clients
  await redis.publish('launches:updates', JSON.stringify(launches))  // :contentReference[oaicite:7]{index=7}

  res.status(200).json({ ok: true, count: launches.length })
}
