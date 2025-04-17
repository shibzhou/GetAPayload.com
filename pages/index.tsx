import Head from 'next/head'
import LaunchTable from '../components/LaunchTable/LaunchTable'

export default function Home() {
  return (
    <>
      <Head>
        <title>Get a Payload</title>
        <meta
          name="description"
          content="Find upcoming commercial payload launches—lightning fast"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero */}
      <section
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'url(/space-bg.jpg) center/cover no-repeat',
          color: 'white',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        <h1 style={{ fontSize: '4rem', margin: 0 }}>Get a Payload</h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          Browse and book your spot on the next space launch →  
        </p>
      </section>

      {/* Timeline */}
      <LaunchTable />

    </>
  )
}
