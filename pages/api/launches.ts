// pages/api/launches.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { redis } from '../../lib/redis'

export interface LaunchRow {
  id: string
  date: string
  vehicle: string
  mission: string
  location: string
  status: 'available' | 'booked'
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<LaunchRow[] | { error: string }>
) {
  try {
    // 1) Attempt to read cache
    const cached = await redis.get('launches:upcoming')
    if (typeof cached === 'string') {
      const parsed = JSON.parse(cached) as LaunchRow[]
      return res.status(200).json(parsed)
    }
    if (Array.isArray(cached)) {
      return res.status(200).json(cached as LaunchRow[])
    }

    // 2) Fetch detailed launches from LL2
    const { data } = await axios.get(
      'https://lldev.thespacedevs.com/2.0.0/launch/upcoming/',
      { params: { limit: 100, mode: 'detailed' } }
    )

    // 3) Flatten each launch into primitive strings
    const launches: LaunchRow[] = data.results
      .filter((l: any) => typeof l.net === 'string' && l.net)
      .map((l: any) => {
        // Vehicle name (prefer rocket config, fallback to splitting name)
        const vehicle =
          l.rocket?.configuration?.name ??
          (typeof l.name === 'string' ? l.name.split(' | ')[0] : 'Unknown')

        // Mission name (fallback to l.mission.name or second half of l.name)
        const mission =
          l.mission?.name ??
          (typeof l.name === 'string' && l.name.includes(' | ')
            ? l.name.split(' | ')[1]
            : l.name ?? 'Unknown')

        // Location: pull pad name and site name
        let locationStr = 'Unknown'
        if (l.pad && typeof l.pad === 'object') {
          const padName = l.pad.name
          const siteName = l.pad.location?.name
          locationStr = siteName
            ? `${padName}, ${siteName}`
            : padName
        }

        // Status: map "Go" → available, everything else → booked
        const status = l.status?.name === 'Go' ? 'available' : 'booked'

        return {
          id: l.id,
          date: l.net,
          vehicle,
          mission,
          location: locationStr,
          status,
        }
      })

    // 4) Cache for 5 minutes
    await redis.set('launches:upcoming', JSON.stringify(launches), { ex: 300 })

    // 5) Return flattened array
    return res.status(200).json(launches)
  } catch (err: any) {
    console.error('API /launches error:', err)
    return res.status(500).json({ error: err.message })
  }
}
