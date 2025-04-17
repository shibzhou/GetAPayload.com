import { ReactNode } from 'react'
import { Navbar } from '../Navbar/Navbar'
import styles from './Layout.module.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  )
}
