import axios, { AxiosInstance } from "axios";
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

  logOut() {
    BackendConnector.connector
      .post('/logOut', {})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export const ServerConnector = new BackendConnector()