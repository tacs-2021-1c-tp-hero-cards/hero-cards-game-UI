import * as Cookies from 'js-cookie'


export function setCookie(name: string, value: any, props?: any): void {
    Cookies.set(name, value, props)
}

export function getCookie(name: string): string | undefined {
    return Cookies.get(name)
}

export function removeCookie(name: string): void {
    Cookies.remove(name)
}

export function updateCookie(name: string, value: any, props?: any): void {
    removeCookie(name)
    setCookie(name, value, props)
}