import axios, { AxiosInstance } from "axios";
import { User } from "./components/User";
import { CardAttributes } from "./components/Card";
import { DeckData, NewDeck, UpdatedDeck } from "./components/Deck";
import { Match } from "./components/Match"
import config from "./config.json"


class BackendConnector {

  static baseURL: string = `${config.SERVER_PROTOCOL}://${config.SERVER_HOST}:${config.SERVER_PORT}`

  static connector: AxiosInstance = axios.create({
    baseURL: BackendConnector.baseURL,
    timeout: 60000,
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
        onSuccess(response.data)
      })
      .catch(function (error) {
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
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  logOut(token: string, onSuccess: (data: any) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/logOut', { token: token })
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCards(onSuccess: (data: CardAttributes[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get('/cards')
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCardById(id: string, onSuccess: (data: CardAttributes) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/cards/${id}`)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCardByName(name: string, onSuccess: (data: CardAttributes[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/cards/search/${name}`)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createDeck(deck: NewDeck, onSuccess: (data: DeckData) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .post('/admin/decks', deck)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }
  
  updateDeck(deck: UpdatedDeck, onSuccess: (data: DeckData) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .put(`/admin/decks/${deck.id}`, deck)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  deleteDeck(deckId: number, onSuccess: () => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .delete(`/admin/decks/${deckId}`)
      .then(function (_) {
        onSuccess()
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getDeckById(id: string, onSuccess: (data: DeckData[]) => void, onFailure: (error: any) => void) {
    this.getDeck(`deck-id=${id}`, onSuccess, onFailure)
  }

  getDeckByName(name: string, onSuccess: (data: DeckData[]) => void, onFailure: (error: any) => void) {
    this.getDeck(`deck-name=${name}`, onSuccess, onFailure)
  }

  private getDeck(deckParam: string, onSuccess: (data: DeckData[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/decks/search?${deckParam}`)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getUsersByUsername(username: string, onSuccess: (data: User[]) => void, onFailure: (error: any) => void) {
    this.getUsers(`user-name=${username}`, onSuccess, onFailure)
  
  }

  getUsersByFullName(fullName: string, onSuccess: (data: User[]) => void, onFailure: (error: any) => void) {
    this.getUsers(`full-name=${fullName}`, onSuccess, onFailure)
  }

  private getUsers(userParam: string, onSuccess: (data: User[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/users/search?${userParam}`)
      .then(function (response) {
        onSuccess(response.data.map((u: any) => (
          {
            username: u.userName,
            fullName: u.fullName
          }
        )))
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createMatch(match: Match, onSuccess: (/*match*/) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .post('/users/matches', {
          userIds: match.users.map(u => u.id).collection,
          deckId: match.deck.id
        }
      )
      .then(function (response) {
        onSuccess(/*response.data*/)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }
}

export const ServerConnector = new BackendConnector()