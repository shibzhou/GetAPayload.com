// components/LaunchTable/LaunchTable.tsx
'use client'

import React from 'react'
import useSWR from 'swr'
import { format, parseISO } from 'date-fns'
import styles from './LaunchTable.module.css'

export interface LaunchRow {
  id: string
  date: string
  vehicle: string
  mission: string
  location: string
  status: 'available' | 'booked'
}

const fetcher = (url: string) => fetch(url).then(res => res.json() as Promise<LaunchRow[]>)

export default function LaunchTable() {
  const { data, error } = useSWR<LaunchRow[]>('/api/launches', fetcher, {
    refreshInterval: 60000,
  })

  if (error) return <p className={styles.error}>Failed to load launches.</p>
  if (!data)  return <p className={styles.loading}>Loading launches…</p>

  return (
    <table className={styles.table} role="grid" aria-label="Upcoming space launches">
      <caption className={styles.caption}>Upcoming Launches</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Vehicle</th>
          <th scope="col">Mission</th>
          <th scope="col">Location</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((l) => {
          // Parse & format date safely
          const parsed = parseISO(l.date)
          const dateStr = isNaN(parsed.getTime())
            ? 'TBA'
            : format(parsed, 'MMM d, yyyy')

          return (
            <tr key={l.id}>
              <td>{dateStr}</td>
              <td>{l.vehicle}</td>
              <td>{l.mission}</td>
              <td>{l.location}</td>
              <td>
                <span
                  className={`${styles.badge} ${
                    l.status === 'available'
                      ? styles.available
                      : styles.booked
                  }`}
                >
                  {l.status}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
