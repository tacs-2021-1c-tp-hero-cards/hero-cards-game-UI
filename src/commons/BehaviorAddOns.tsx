import { useToast } from "@chakra-ui/toast"
import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { ServerConnector } from "../BackendConnector"
import { User } from "../components/User"
import { Collection } from "./Collections"
import { getToken, tokenIsAlive } from "./Token"

type RendereableComponent = (_: any) => any
type ComponentContent = () => any


export type RedirectProps = { 
  redirect: (_: string) => void,
  renderRedirect: (_: string) => any
}

export function withRedirect(props: any) {
  let history = useHistory()

  function redirect(to: string) {
    history.push(to)
  }
  
  function renderRedirect(to: string) {
    return( <>{redirect(to)}</> )
  }

  const newProps = {
      ...props, 
      redirect: redirect,
      renderRedirect: renderRedirect
    }

  return (component: RendereableComponent) => component(newProps)
}


export type QueryParamsProps = { queryParams: URLSearchParams }

export function withQueryParams(props: any) {
    const queryParams = new URLSearchParams(useLocation().search);

    const newProps = {
        ...props, 
        queryParams: queryParams
    }

    return (component: RendereableComponent) => component(newProps)
}


export type ToastProps = { toast: any }

export function withToast(props: any) {

    const newProps = {
        ...props, 
        toast: useToast()
    }

    return (component: RendereableComponent) => component(newProps)
}


export type TokenProps = { 
  renderWithTokenValidation: (content: ComponentContent) => any,
  validateToken: () => void 
}

export function withTokenValidation(props: any) {
  let history = useHistory()

  function logInError() {
    history.push('/logInError')
  }

  function renderValidation(component: ComponentContent) {
    return tokenIsAlive() ? component() : <>{logInError()}</>
  }

  function validateToken() {
    if (tokenIsAlive()) {
      logInError()
    }
  }

  const newProps = {
    ...props,
    renderWithTokenValidation: renderValidation,
    validateToken: validateToken
  }

  return (component: RendereableComponent) => component(newProps)
}


export type ReloadProps = {
  reload: () => void
}

export function withReload(props: any) {
  function reload() { window.location.reload() }

  const newProps = {
    ...props,
    reload: reload
  }

  return (component: RendereableComponent) => component(newProps)
}

export type UserSupportProps = {
  user: User,
  getUser: () => void
}

export function withUserSupport(props: any) {
  const [ user, setUser ] = useState<User>()
  const [ searchingUser, setSearchingUser ] = useState(false)

  function getUser() {
    if (!user && !searchingUser) {
      setSearchingUser(true)

      ServerConnector.getUsersByToken(
          getToken()!,
          (users) => {
              setUser(Collection.wrap(users).head())
              setSearchingUser(false)
          },
          (_) => setSearchingUser(false)
      )
    }
  }

  let newProps = {
    ...props,
    user: user,
    getUser: getUser
  }

  return (component: RendereableComponent) => component(newProps)
}
