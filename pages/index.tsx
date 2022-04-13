import type { NextPage, GetServerSideProps } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Crown clothing</h1>
      </main>

      <footer></footer>
    </>
  )
}

export default Home
