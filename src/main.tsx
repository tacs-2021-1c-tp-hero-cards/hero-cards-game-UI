import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
