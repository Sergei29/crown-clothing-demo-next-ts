import { Fragment } from "react"
import type { AppProps } from "next/app"
import GlobalStyle from "../src/styles/GlobalStyle"
import { ThemeProvider } from "styled-components"
import { theme } from "../src/theme"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
