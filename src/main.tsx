import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { persistStore } from 'redux-persist'

import App from './App'
import theme from './theme'
import store from './store/Store'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PersistGate persistor={persistor}>
        <App />        
      </PersistGate>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
