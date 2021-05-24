import { getCookie, removeCookie, setCookie, updateCookie } from "./Cookies";

function expiry() {
    let minute = 1 / (24 * 60)

    return { expires: 5 * minute } // Expires in 5 minutes of inactivity
}

export function setToken(value: string) {

    setCookie('token', value, expiry())

}

export function getToken() {
    return getCookie('token')
}

export function updateTokenExpiry() {
    const token = getToken()
    if (token && token != '')
        updateCookie('token', token!, expiry())
}

export function clearToken() {
    removeCookie('token')
}

export function tokenIsAlive(): boolean {
    const token = getToken() ?? ''

    return token != ''
}