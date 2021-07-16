import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'

import App from './App'
import theme from './theme'
import store from './store/Store'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />        
      </PersistGate>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
