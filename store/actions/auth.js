export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiBrDyMMfV7-p3dm7ZS6vUKFhDm1JdgqM`,
        {
            method: 'POST',
            headers:{
               'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo ha salido mal'
            if(errorId === 'EMAIL_EXIST'){
                message = 'Este correo ya existe'
            } 
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        dispatch({ type: SIGNUP })

    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiBrDyMMfV7-p3dm7ZS6vUKFhDm1JdgqM`,
        {
            method: 'POST',
            headers:{
               'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo ha salido mal'
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'No se pudo encontrar el correo'
            } else if (errorId === 'MISSING_PASSWORD'){
                message = 'Ingrese la contraseña'
            } else if (errorId === 'INVALID_EMAIL'){
                message = 'Ingrese un correo válido'
            }

            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        dispatch({ type: LOGIN })

    }
}