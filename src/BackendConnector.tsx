import axios, { AxiosInstance } from "axios";
import { User } from "./components/User";
import { CardAttributes, CharacterDetails } from "./components/Card";
import { DeckData, NewDeck, UpdatedDeck } from "./components/Deck";
import { Match, MatchData } from "./components/Match"
import config from "./config.json"
import { AI } from "./components/AI";


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
      .post('/signUp', user)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  logIn(user: User, onSuccess: (data: any) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/logIn', user)
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

  getCharacterDetails(id: string, onSuccess: (character: CharacterDetails) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/character/${id}`)
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

  getUsersByToken(token: string, onSuccess: (data: User[]) => void, onFailure: (error: any) => void) {
    this.getUsers(`token=${token}`, onSuccess, onFailure)
  }

  private getUsers(userParam: string, onSuccess: (data: User[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/users/human?${userParam}`)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getAIsByName(username: string, onSuccess: (data: AI[]) => void, onFailure: (error: any) => void) {
    this.getAIs(onSuccess, onFailure, `user-name=${username}`)
  
  }

  getAIsById(id: string, onSuccess: (data: AI[]) => void, onFailure: (error: any) => void) {
    this.getAIs(onSuccess, onFailure, `user-id=${id}`)
  }

  getAIsByDificulty(difficulty: string, onSuccess: (data: AI[]) => void, onFailure: (error: any) => void) {
    this.getAIs(onSuccess, onFailure, `difficulty=${difficulty}`)
  }

  getAIs(onSuccess: (data: AI[]) => void, onFailure: (error: any) => void, AIParam?: string) {
    BackendConnector.connector
      .get(`/users/ia${AIParam ? '?' + AIParam : ''}`)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createMatch(match: Match, onSuccess: (match: MatchData) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .post('/users/matches', {
          humanUserIds: match.users.map(u => u.id).collection,
          iaUserIds: match.AIs.map(ai => ai.id).collection,
          deckId: match.deck.id
        }
      )
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }
}

export const ServerConnector = new BackendConnector()