import Link from 'next/link'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <Link href="/" className={styles.logo}>
          Get a Payload
        </Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link href="/#launches">Launches</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/docs">Docs</Link>
        </li>
      </ul>
    </nav>
  )
}
