import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { LogInPage } from './pages/LogInPage'
import { NotFoundPage } from "./pages/NotFoundPage";
import { Box } from "@chakra-ui/layout";
import theme from "./theme";
import { SignUpPage } from "./pages/SignUpPage";
import { UserPage } from "./pages/UserPage";

class App extends Component<{}, {}> {

  render() {
    return <Box bg={theme.backgroundColor}>
      <Router>
        <Switch>
          <Redirect exact={true} from="/" to="/home" />
          <Route exact={true} path="/home" component={HomePage} />
          <Route path="/signUp" component={SignUpPage} />
          <Redirect from='/signIn' to='/logIn'/>
          <Route path="/logIn" component={LogInPage} />
          <Route path="/user" component={UserPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Box>
  }
}

export default App
