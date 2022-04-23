import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { SessionProvider } from "next-auth/react"
import { wrapper } from "../src/redux/store"
import GlobalStyle from "../src/styles/GlobalStyle"
import { theme } from "../src/theme"

const MyApp = ({ Component, pageProps: { session, ...props } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default wrapper.withRedux(MyApp)
