import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url(https://fonts.googleapis.com/css?family=Mouse+Memoirs:400,700);

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Mouse Memoirs', sans-serif;
    letter-spacing: .03em;
    background-color: #F1D5A5;
  }
`
