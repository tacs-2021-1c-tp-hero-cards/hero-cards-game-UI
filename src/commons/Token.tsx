import { getCookie, setCookie } from "./Cookies";


export function setToken(value: string, expiry?: Date) {
    let defaultExpiry = new Date()
    defaultExpiry.setMinutes(defaultExpiry.getMinutes() + 5)

    setCookie('token', value, { expires: expiry ?? defaultExpiry })

}

export function getToken() {
    return getCookie('token')
}

export function updateTokenExpiry() {
    const token = getToken()
    if (token && token != '')
        setToken(getToken()!)
}

export function clearToken() {
    setToken('', new Date())
}