import { useToast } from "@chakra-ui/toast"
import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import NotLoggedInPage from "../pages/NotLoggedInPage"
import store from "../store/Store"
import { logOut } from "./LogOut"
import { tokenIsAlive } from "./Token"

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
  // validateToken: () => void 
}

export function withTokenValidation(props: any) {

  function logInError() {
    logOut(() => {}, () => {})
    
    return <NotLoggedInPage />
  }

  function renderValidation(component: ComponentContent) {
    return tokenIsAlive() ? component() : logInError()
  }

  // function validateToken() {
  //   if (tokenIsAlive()) {
  //     logInError()
  //   }
  // }

  const newProps = {
    ...props,
    renderWithTokenValidation: renderValidation,
    // validateToken: validateToken
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


export type AdminSupportProps = {
  renderWithAdminValidation: (content: ComponentContent) => any
}

export function withAdminValidation(props: any) {

  function renderValidation(component: ComponentContent) {
    return store.getState().user.admin ? component() : <NotFoundPage />
  }

  const newProps = {
    ...props,
    renderWithAdminValidation: renderValidation
  }

  return (component: RendereableComponent) => component(newProps)
}


export type ConditionalRenderSupportProps = {
  renderOnCondition: (condition: boolean, content: ComponentContent) => any
}

export function withRenderCondition(props: any) {

  function renderValidation(condition: boolean, component: ComponentContent) {
    return condition ? component() : <NotFoundPage />
  }

  const newProps = {
    ...props,
    renderOnCondition: renderValidation
  }

  return (component: RendereableComponent) => component(newProps)
}

