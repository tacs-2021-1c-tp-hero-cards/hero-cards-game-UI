import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { LogInPage } from './pages/LogInPage'
import { NotFoundPage } from "./pages/NotFoundPage";
import { Box } from "@chakra-ui/layout";
import theme from "./theme";
import { SignUpPage } from "./pages/SignUpPage";
import { UserPage } from "./pages/UserPage";
import { UserProps } from "./commons/User";
import { withCookies } from "react-cookie";

class App extends Component<{}, UserProps> {

  render() {
    return <Box bg={theme.backgroundColor}>
      <Router>
        <Switch>
          <Redirect exact={true} from="/" to="/home" />
          <Route exact={true} path="/home" component={withCookies(HomePage)} />
          <Route path="/signUp" component={withCookies(SignUpPage)} />
          <Redirect from='/signIn' to='/logIn'/>
          <Route path="/logIn" component={withCookies(LogInPage)} />
          <Route path="/user" component={withCookies(UserPage)} />
          <Route component={withCookies(NotFoundPage)} />
        </Switch>
      </Router>
    </Box>
  }
}

export default App
