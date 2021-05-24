

export function validateUsername(value: any) {
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const atLeastOneLetterRegex = /[a-zA-Z]+/
    let error

    if (!value) {
        error = 'Username is required'
    } else if(!usernameRegex.test(value)) {
        error = 'Only letters and numbers are allowed'
    } else if(!atLeastOneLetterRegex.test(value)) {
        error = 'Username must have at least one letter'
    }

    return error
}

export function nonEmpty(value: any) {
    let error

    if (!value || value === '' || value === []) {
        error = 'Cannot be empty'
    } 

    return error
}

export function validateFullName(value: any) {
    const fullNameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/
    let error

    if (!value) {
        error = 'Full name is required'
    } else if(!fullNameRegex.test(value)) {
        error = 'It should only be formed by letters, maybe with spaces'
    }

    return error
}

export function validatePassword(value: any) {
    const passwordMinLength = 6
    const passwordMaxLength = 20
    const passwordRegex = /^[a-zA-Z0-9]+$/
    const atLeastOneLowerCaseRegex = /[a-z]+/
    const atLeastOneUpperCaseRegex = /[A-Z]+/
    const atLeastOneNumberRegex = /\d+/
    let error

    if (!value) {
        error = 'Password is required'
    } else if(!passwordRegex.test(value)) {
        error = 'Only letters and numbers are allowed'
    } else if(value.length < passwordMinLength) {
        error = `Password must have at least ${passwordMinLength} characters`
    } else if(value.length > passwordMaxLength) {
        error = `Password must have no more than ${passwordMaxLength} characters`
    } else if(!(atLeastOneLowerCaseRegex.test(value) && 
                atLeastOneUpperCaseRegex.test(value) && 
                atLeastOneNumberRegex.test(value))) {
                    error = 'Password must have, at least, an upper case letter, a lower case letter and a number'
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
