import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { LogInPage } from './pages/LogInPage'
import { NotFoundPage } from "./pages/NotFoundPage";
import { Box } from "@chakra-ui/layout";
import theme from "./theme";

function App() {
  return <Box bg={theme.backgroundColor}>
    <Router>
      <Switch>
        <Redirect exact={true} from="/" to="/home" />
        <Route exact={true} path="/home" component={HomePage} />
        <Redirect from="/signUp" to="/logIn" />
        <Route path="/logIn" component={LogInPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Box>
}

export default App
