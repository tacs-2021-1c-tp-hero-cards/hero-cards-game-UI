import { Box } from '@chakra-ui/layout';
import React from 'react'
import { Home } from './components/Home'
import { Login } from './components/Login'

function App() {
  return resolveURL()
}

function resolveURL() {
  switch (window.location.pathname) {
    case '/':
      return(<Home />);
    case '/home':
      return(<Home />);
    case '/login':
      return(<Login />);
    default:
      return(
        <Box>Page not found!</Box>
      )
  }
}


export default App
