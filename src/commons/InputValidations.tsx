

// TODO: Impprove inputs validations

export function validateUsername(value: any) {
    let error
    if (!value) {
        error = 'Username is required'
    }

    return error
}

export function validateFullName(value: any) {
    let error
    if (!value) {
        error = 'Full name is required'
    }

    return error
}

export function validatePassword(value: any) {
    let error
    if (!value) {
        error = 'Password is required'
    }

    return error
}

export function validateRepeatedPassword(value: any, pass1: any) {
    let error

    if (!value) {
        error = 'Repeated password is required'
    } else if (value !== pass1) {
        error = 'Incorrect password'
    }

    return error
}
