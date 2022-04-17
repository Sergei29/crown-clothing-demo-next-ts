import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../src/containers/PageContainer"
import NoDataPlaceholder from "../src/components/NoDataPlaceholder"

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Not Found</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <NoDataPlaceholder customMessage="Oups! Page not found." />
      </PageContainer>
    </>
  )
}

export default NotFoundPage
