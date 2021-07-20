import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { User } from "./components/players/User";
import { CardAttributes, CharacterDetails } from "./components/cards/Card";
import { DeckData, NewDeck, UpdatedDeck } from "./components/decks/Deck";
import { Match, MatchCreation } from "./components/matches/Match"
import config from "./config.json"
import { AI, AiData } from "./components/players/bots/AI";
import { getToken } from "./commons/Token";

type Authentication = {
  token: string
}

type ConfirmationBody = {
  confirm: boolean
}

class BackendConnector {

  static baseURL: string = `${config.SERVER_PROTOCOL}://${config.SERVER_HOST}:${config.SERVER_PORT}`

  static connector: AxiosInstance = axios.create({
    baseURL: BackendConnector.baseURL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  headers(): AxiosRequestConfig {
    const token = getToken()
    return token ? {
      headers: {
        'x-user-token': token
      }
    } : {}
  }

  signUp(user: User, onSuccess: (data: number) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/signUp', user)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  logIn(user: User, onSuccess: (data: Authentication) => void, onFailure: (error: any) => void) {

    BackendConnector.connector
      .post('/logIn', user)
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  logOut(token: string, onSuccess: () => void, onFailure: (error: any) => void) {

    const headers = token ? {
      headers: {
        'x-user-token': token
      }
    } : {}

    BackendConnector.connector
      .post('/logOut', {}, headers)
      .then(function (_) {
        onSuccess()
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCards(onSuccess: (data: CardAttributes[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get('/cards', this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCardById(id: string, onSuccess: (data: CardAttributes) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/cards/${id}`, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCardByName(name: string, onSuccess: (data: CardAttributes[]) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/cards/search/${name}`, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getCharacterDetails(id: string, onSuccess: (character: CharacterDetails) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/character/${id}`, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createDeck(deck: NewDeck, onSuccess: (data: DeckData) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .post('/admin/decks', deck, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }
  
  updateDeck(deck: UpdatedDeck, onSuccess: (data: DeckData) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .put(`/admin/decks/${deck.id}`, deck, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  deleteDeck(deckId: number, onSuccess: () => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .delete(`/admin/decks/${deckId}`, this.headers())
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
      .get(`/decks/search?${deckParam}`, this.headers())
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
      .get(`/users/human?${userParam}`, this.headers())
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
    this.getAIs(onSuccess, onFailure, `difficulty=${normalizeDifficulty(difficulty)}`)
  }

  getAIs(onSuccess: (data: AI[]) => void, onFailure: (error: any) => void, AIParam?: string) {
    BackendConnector.connector
      .get(`/users/ia${AIParam ? '?' + AIParam : ''}`, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createAI(AI: AiData, onSuccess: (id: number) => void, onFailure: (error: any) => void) {
    const body = {
      userName: AI.name,
      difficulty: normalizeDifficulty(AI.difficulty)
    }
    
    BackendConnector.connector
      .post('/admin/users/ia', body, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  createMatch(match: MatchCreation, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .post('/matches', match, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  getMatch(matchId: number, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .get(`/matches/${matchId}`, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  acceptMatch(matchId: number, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    this.confirmMatch(matchId, { confirm: true }, onSuccess, onFailure)
  }

  rejectMatch(matchId: number, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    this.confirmMatch(matchId, { confirm: false }, onSuccess, onFailure)
  }

  private confirmMatch(matchId: number, body: ConfirmationBody, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    BackendConnector.connector
      .patch(`/matches/${matchId}/confirmation`, body, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }

  nextDuel(matchId: string, duelType: string, onSuccess: (match: Match) => void, onFailure: (error: any) => void) {
    const body = {
      duelType: duelType
    }

    BackendConnector.connector
      .patch(`/matches/${matchId}/nextDuel`, body, this.headers())
      .then(function (response) {
        onSuccess(response.data)
      })
      .catch(function (error) {
        onFailure(error)
      })
  }
}

export const ServerConnector = new BackendConnector()

export function normalizeDifficulty(difficulty: string) {
    switch(difficulty) {
        case 'easy': return 'EASY'
        case 'medium': return 'HALF'
        case 'hard': return 'HARD'
        case 'crazy': return 'RANDOM'
        default : throw new Error("Unknown difficulty")
    }
}

export function denormalizeDifficulty(difficulty: string) {
    switch(difficulty) {
        case 'EASY': return 'easy'
        case 'HALF': return 'medium'
        case 'HARD': return 'hard'
        case 'RANDOM': return 'crazy'
        default : throw new Error("Unknown difficulty")
    }
}
