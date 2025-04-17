// components/LaunchTimeline/RealLaunchTimeline.tsx
'use client'

import useSWR from 'swr'
import LaunchTimeline, { Launch } from './LaunchTimeline'

const fetcher = (url: string) => fetch(url).then(res => res.json() as Promise<Launch[]>)

export default function RealLaunchTimeline() {
  const { data, error } = useSWR<Launch[]>('/api/launches', fetcher, {
    refreshInterval: 60000,   // revalidate every minute
  })

  if (error) return <div className="error">Failed to load launches.</div>
  if (!data)   return <div className="loading">Loading launches…</div>

  return <LaunchTimeline launches={data} />
}
