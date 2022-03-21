const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const statusValidate = (payload) => {
    if (payload === 'active' || payload === 'inactive') {
        return payload
    }
    throw {
        err: `Error validation status`
    }
}

const validationUser = (key) => {
    switch (key.code) {
        case `23505`:
            throw {
                validation : {
                    detail : `Email already exists`,
                    code : `23505`
                }
            }
    }
}

export {
    isEmail,
    statusValidate,
    validationUser
}