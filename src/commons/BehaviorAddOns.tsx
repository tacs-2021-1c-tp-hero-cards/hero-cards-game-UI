import { useToast } from "@chakra-ui/toast"
import React from "react"
import { useHistory, useLocation } from "react-router-dom"

type rendereableComponent = (_: any) => any

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

  return (component: rendereableComponent) => component(newProps)
}

export type QueryParamsProps = { queryParams: URLSearchParams }

export function withQueryParams(props: any) {
    const queryParams = new URLSearchParams(useLocation().search);

    const newProps = {
        ...props, 
        queryParams: queryParams
    }

    return (component: rendereableComponent) => component(newProps)
}

export type ToastProps = { toast: any }

export function withToast(props: any) {

    const newProps = {
        ...props, 
        toast: useToast()
    }

    return (component: rendereableComponent) => component(newProps)
}

