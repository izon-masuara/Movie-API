const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const userEmail = re.test(String(email).toLowerCase());
    if (userEmail) {
        return email
    } else {
        throw {
            message: `Fromat email wrong`,
            code: `0001`
        }
    }
}

const statusValidate = (payload) => {
    if (payload === 'active' || payload === 'inactive') {
        return payload
    }else{
        throw {
            message : `status does not exists`,
            code : `0002`
        }
    }
}

const validationUser = (key) => {
    let eachOfErrors = []
    switch (key.code) {
        case `23505`:
            eachOfErrors.push(`Email already exists`)
            break;
        case `0001`:
            eachOfErrors.push(key.message)
            break;
        case `0002`:
            eachOfErrors.push(key.message)
            break;
        default : 
            break;

    }
    const validation = {
        code : `400`,
        eachOfErrors
    }
    throw validation
}

export {
    isEmail,
    statusValidate,
    validationUser
}