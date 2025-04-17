import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Get a Payload</title>
        <meta name="description" content="Find upcoming commercial payload launches" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>Launch something into space? GetAPayload.com!</h1>
        <p className={styles.subtitle}>
          Explore upcoming satellite launch opportunities—lightning fast, always up to date.
        </p>
      </main>
    </>
  )
}
