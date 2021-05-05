
export function redirect(to: string, from: any) {
    from.setState({
        redirectTo: to,
        shouldRedirect: true
      })
}