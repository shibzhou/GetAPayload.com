// components/LaunchTimeline/LaunchTimeline.tsx
import React, { useRef } from 'react'
import styles from './LaunchTimeline.module.css'
import { format, parseISO } from 'date-fns'

export interface Launch {
  id: string
  date: string
  name: string
  status: 'available' | 'booked'
}

interface LaunchTimelineProps {
  launches: Launch[]
}

export default function LaunchTimeline({ launches }: LaunchTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.timelineSection}>
      <h2 className={styles.heading}>Upcoming Launches</h2>
      <div className={styles.wrapper}>
        <button className={styles.navBtn} onClick={() => scroll('left')}>&lt;</button>
        <div className={styles.timeline} ref={containerRef}>
          {launches.map((l) => (
            <div key={l.id} className={styles.event}>
              <div
                className={styles.dot}
                style={{
                  backgroundColor:
                    l.status === 'available'
                      ? 'var(--status-available)'
                      : 'var(--status-booked)',
                }}
              />
              <div className={styles.info}>
                {(() => {
                  if (typeof l.date !== 'string' || !l.date.trim()) {
                    return <span className={styles.date}>TBA</span>
                  }
                  const parsed = parseISO(l.date)
                  if (isNaN(parsed.getTime())) {
                    return <span className={styles.date}>TBA</span>
                  }
                  return (
                    <span className={styles.date}>
                      {format(parsed, 'MMM d, yyyy')}
                    </span>
                  )
                })()}
                <span className={styles.name}>{l.name}</span>
                <span className={styles.status}>
                  {l.status === 'available' ? 'Available' : 'Booked'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.navBtn} onClick={() => scroll('right')}>&gt;</button>
      </div>
    </section>
  )
}
