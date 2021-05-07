import * as Cookies from 'js-cookie'


export function setCookie(name: string, value: any, props?: any): void {
    Cookies.set(name, value, props)
}

export function getCookie(name: string) {
    return Cookies.get(name)
}