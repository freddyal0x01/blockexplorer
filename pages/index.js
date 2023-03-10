import Head from 'next/head'
import Header from '../components/header'
import Blocks from '../components/blocks'
import Transactions from '../components/transactions'

export default function Home() {
  return (
    <>
      <Head>
        <title>Block Explorer</title>
        <meta name="description" content="Block Explorer Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className='flex flex-col sm:flex-row sm:justify-around my-12'>  
        <Blocks />
        <Transactions />
      </main>
    </>
  )
}
