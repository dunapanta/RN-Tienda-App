import { ADD_TO_CART } from "../actions/cart"
import CartItem from '../../models/cart-item'

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
    }
    return state
}