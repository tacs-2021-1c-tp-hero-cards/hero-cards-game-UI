import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from 'react'
import { HomePage } from './pages/HomePage'
import { LogInPage } from './pages/LogInPage'
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact={true} from="/" to="/home" />
        <Route exact={true} path="/home" component={HomePage} />
        <Route path="/login" component={LogInPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
