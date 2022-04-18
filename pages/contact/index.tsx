import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../../src/containers/PageContainer"
import NoDataPlaceholder from "../../src/components/NoDataPlaceholder"

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crown Clothing | Contact</title>
        <meta name="description" content="Online commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <NoDataPlaceholder customMessage="Sorry, this page is under construction" />
      </PageContainer>
    </>
  )
}

export default ContactPage
