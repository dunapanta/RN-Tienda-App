import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from "../actions/products"

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            // averiguar si este producto ya es parte de items este if arroja thruis o undefined
            if (state.items[addedProduct.id]){
                // ya lo tenia por eso agrego mas cantidad
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity +1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice

                )
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem}, //esta sobrescribiendo el que ya existe
                    totalAmount: state.totalAmount + prodPrice
                }
            }else {
                // lo agrego
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: newCartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
            }

        case REMOVE_FROM_CART:
            const currentQty = state.items[action.pid].quantity
            let updatedCartItems
            if (currentQty > 1){
                //se reduce la cantidad
                const updatedCartItem = new CartItem(
                        state.items[action.pid].quantity -1,
                        state.items[action.pid].productPrice,
                        state.items[action.pid].productTitle,
                        state.items[action.pid].sum - state.items[action.pid].productPrice
                        )
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem }
            } else {
                // se elimina
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - state.items[action.pid].productPrice
            }

        case ADD_ORDER:
            return initialState
        
        case DELETE_PRODUCT:
            if (!state.items[action.pid]){
                return state
            }
            const updatedItems = {...state.items}
            const itemTotal = state.items[action.pid].sum
            delete updatedItems[action.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            } 

    }
    return state
}