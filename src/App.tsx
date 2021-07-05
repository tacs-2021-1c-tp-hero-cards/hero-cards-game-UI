import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { LogInPage } from './pages/LogInPage'
import { NotFoundPage } from "./pages/NotFoundPage";
import { Box } from "@chakra-ui/layout";
import theme from "./theme";
import { SignUpPage } from "./pages/SignUpPage";
import { UserPage } from "./pages/UserPage";
import { NotLoggedInPage } from "./pages/NotLoggedInPage";
import { DecksPage } from "./pages/DecksPage";
import { CardsPage } from "./pages/CardsPage";
import { UnexpectedErrorPage } from "./pages/UnexpectedErrorPage";
import { ShowDeckPage } from "./pages/ShowDeckPage"
import { ShowCardPage } from "./pages/ShowCardPage"
import { StartMatchPage } from "./pages/MatchesPage"
import { updateTokenExpiry } from "./commons/Token";
import { useIdleTimer } from "react-idle-timer";


function App() {

  const handleOnActive = (_: any) => { 
    updateTokenExpiry() 
  }
  const handleOnAction = (_: any) => { 
    updateTokenExpiry() 
  }

  useIdleTimer({
    onActive: handleOnActive,
    onAction: handleOnAction
  })

  return (
    <Box bg={theme.backgroundColor}>
      <Router>
        <Switch>
          <Redirect exact={true} from="/" to="/home" />
          <Route exact={true} path="/home" component={HomePage} />
          <Route path="/signUp" component={SignUpPage} />
          <Redirect from='/signIn' to='/logIn'/>
          <Route path="/logIn" component={LogInPage} />
          <Route path="/user" component={UserPage} />
          <Route path='/matches' component={StartMatchPage} />
          <Route exact path='/decks' component={DecksPage} />
          <Route exact path='/cards' component={CardsPage} />
          <Route path='/decks/:deckId' component={ShowDeckPage} />
          <Route path='/characters/:characterId' component={ShowCardPage} />
          <Route path='/logInError' component={NotLoggedInPage} />
          <Route path='/error' component={UnexpectedErrorPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Box>
  )
}

export default App
