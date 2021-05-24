import { useToast } from "@chakra-ui/toast"
import React from "react"
import { useHistory, useLocation } from "react-router-dom"
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

function redirects() {
  
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

export type TokenProps = { renderWithTokenValidation: (content: ComponentContent) => any }

export function withTokenValidation(props: any) {
  let history = useHistory()

  function renderValidation(component: ComponentContent) {
    return tokenIsAlive() ? component() : <>{history.push('/logInError')}</>
  }

  const newProps = {
    ...props,
    renderWithTokenValidation: renderValidation
  }

  return (component: RendereableComponent) => component(newProps)
}