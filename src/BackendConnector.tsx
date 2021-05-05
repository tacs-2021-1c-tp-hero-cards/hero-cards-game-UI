import axios, { AxiosInstance } from "axios";
import { User } from "./commons/User";
import config from "./config.json"


class BackendConnector {

  static baseURL: string = `${config.SERVER_PROTOCOL}://${config.SERVER_HOST}:${config.SERVER_PORT}`

  static connector: AxiosInstance = axios.create({
    baseURL: BackendConnector.baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  signUp(user: User, onSuccess: (data: any) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/signUp', {
        userName: user.username,
        fullName: user.fullName,
        password: user.password
      })
      .then(function (response) {
        console.log(response.data)
        onSuccess(response.data)
      })
      .catch(function (error) {
        console.log(error)
        onFailure(error)
      })
  }

  logIn(user: User, onSuccess: (data: any) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/logIn', {
        userName: user.username,
        password: user.password
      })
      .then(function (response) {
        console.log(response.data)
        onSuccess(response.data)
      })
      .catch(function (error) {
        console.log(error)
        onFailure(error)
      })
  }

  logOut(token: string, onSuccess: (data: any) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/logOut', { token: token })
      .then(function (response) {
        console.log(response.data)
        onSuccess(response.data)
      })
      .catch(function (error) {
        console.log(error)
        onFailure(error)
      })
  }
}

export const ServerConnector = new BackendConnector()