import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import theme from "./theme";
import { Box } from "@chakra-ui/layout";
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import DecksPage from "./pages/DecksPage";
import CardsPage from "./pages/CardsPage";
import BotsPage from "./pages/AIsPage";
import DeckPage from "./pages/DeckPage"
import CardPage from "./pages/CardPage"
import StartMatchPage from "./pages/MatchesPage"
import MatchPage from './pages/MatchPage'
import NotFoundPage from "./pages/NotFoundPage";
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
    <Box bg={theme.backgroundColor} minHeight='62.2rem'>
      <Router>
        <Switch>
          <Redirect exact={true} from="/" to="/home" />
          <Route exact={true} path="/home" component={HomePage} />
          <Route path="/signUp" component={SignUpPage} />
          <Redirect from='/signIn' to='/logIn'/>
          <Route path="/logIn" component={LogInPage} />
          <Route path="/user" component={UserPage} />
          <Route exact path='/matches' component={StartMatchPage} />
          <Route exact path='/decks' component={DecksPage} />
          <Route exact path='/cards' component={CardsPage} />
          <Route exact path='/bots' component={BotsPage} />
          <Route path='/decks/:deckId' component={DeckPage} />
          <Route path='/characters/:characterId' component={CardPage} />
          <Route path='/matches/:matchId' component={MatchPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Box>
  )
}

export default App
