import { useRef } from 'react'
import styles from './LaunchTimeline.module.css'
import { format } from 'date-fns'

interface Launch {
  id: string
  date: string
  name: string
  status: 'available' | 'booked'
}

// Dummy data––later you’ll replace with real API fetch
const launches: Launch[] = [
  { id: '1', date: '2025-05-01', name: 'Falcon 9 • Starlink Batch 40', status: 'available' },
  { id: '2', date: '2025-05-10', name: 'Ariane 6 • SES-18', status: 'booked' },
  { id: '3', date: '2025-05-20', name: 'Long March 8 • Earth Observation', status: 'available' },
  { id: '4', date: '2025-06-02', name: 'Vulcan Centaur • LCRV Test', status: 'available' },
  // …more
]

export default function LaunchTimeline() {
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
                <span className={styles.date}>{format(new Date(l.date), 'MMM d, yyyy')}</span>
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
