import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    margin-top : 35px;
    padding: 0;
    -ms-overflow-style: ${({drag}) => drag ? 'none' : 'auto'};  /* IE and Edge */
    scrollbar-width: ${({drag}) => drag ? 'none' : 'auto'};  /* Firefox */
    -webkit-touch-callout: ${({drag}) => drag ? 'none' : 'auto'}; /* iOS Safari */
    -webkit-user-select:${({drag}) => drag ? 'none' : 'auto'}; /* Safari */
     -khtml-user-select:${({drag}) => drag ? 'none' : 'auto'}; /* Konqueror HTML */
       -moz-user-select: ${({drag}) => drag ? 'none' : 'auto'}; /* Old versions of Firefox */
        -ms-user-select: ${({drag}) => drag ? 'none' : 'auto'}; /* Internet Explorer/Edge */
            user-select: ${({drag}) => drag ? 'none' : 'auto'}; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

    overflow : ${({scroll}) => scroll ? 'scroll' : 'hidden'};
  }

  *::-webkit-scrollbar {
    display : none;
  }
  
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
  }

  div {
    text-align: center;
  }
  small {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
`

const globalVars = {
  server : "http://localhost:3000",
  clientid : "837278079440-6e2p92o3b1olubaa8247p5cqpltc1ct4.apps.googleusercontent.com"
}

export default globalVars;