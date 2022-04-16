import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  body {
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 300;
    padding: 20px 60px;
  }
  * , *:before, *:after {
    box-sizing: inherit;
  }
`

export default GlobalStyle
