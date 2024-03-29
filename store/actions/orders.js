import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch(`https://rn-shop-app-dc6ed-default-rtdb.firebaseio.com/orders/${userId}.json`) 

            if(!response.ok){
                // si no devolvio status 200 quiero que arroje error per ejemplo si no esta authenticado
                throw new Error('Algo ha salido mal')

            }
            const resData = await response.json()

            // necesito trabajar con arrays asi que lo transformo
            const loadedOrders = []
            for (const key in resData){
                loadedOrders.push( 
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date) //se crea un date nuevo xq solo se almacena como string en firebase y necesito en obj
                    )
                )
            }       

            dispatch({ type: SET_ORDERS, orders: loadedOrders})
        } catch(err) {
            throw err
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        const date = new Date();
        const response = await fetch(
            `https://rn-shop-app-dc6ed-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            })

            if(!response.ok){
                throw new Error('Algo ha salido mal')
            }

            // data returned by firebase cuando se añade un producto devuelve un objeto con estos campos  "name": "-MUWJLw8GnsSIiPQywI3",
            const resData = await response.json() 

            dispatch({
                type: ADD_ORDER,
                orderData: { 
                    id: resData.name, 
                    items: cartItems, 
                    amount: totalAmount,
                    date: date
                }
            })

            //Send Notification
            for (const cartItem of cartItems){
                const pushToken = cartItem.productPushToken

                //console.log("Token", cartItem)

                fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: pushToken,
                        title: 'La orden fue realizada',
                        body: cartItem.productTitle
                        //data: cartItem
                    })
                })
            }
    }
}