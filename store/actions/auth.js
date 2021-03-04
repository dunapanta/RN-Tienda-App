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
            throw new Error('Algo ha ido mal')
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
            console.log(response)
            throw new Error('Algo ha ido mal')
        }

        const resData = await response.json()
        console.log(resData)

        dispatch({ type: LOGIN })

    }
}