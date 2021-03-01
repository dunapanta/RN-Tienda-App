import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-dc6ed-default-rtdb.firebaseio.com/products.json', {
            })

            const resData = await response.json() 

            if(!response.ok){
                // si no devolvio status 200 quiero que arroje error per ejemplo si no esta authenticado
                throw new Error('Algo ha salido mal')

            }
            /* devuelve un objeto
                    Object {
            "-MUWJLw8GnsSIiPQywI3": Object {
                "description": "Elegante camisa",
                "imageUrl": "https://swat-store.com/202-large_default/camisa-tactica-manga-corta-color-plomo.jpg",
                "price": 67,
                "title": "Camisa",
            },
            }
            */
            //console.log(resData)

            // necesito trabajar con arrays asi que lo transformo
            const loadedProducts = []
            for (const key in resData){
                loadedProducts.push( new Product(
                    key, 'u1', 
                    resData[key].title, 
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                    ))
            }
            dispatch({ type: SET_PRODUCTS, products: loadedProducts })
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId
    }
}
export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // se puede ejecutar código asíncrono
        const response = await fetch('https://rn-shop-app-dc6ed-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        // data returned by firebase cuando se añade un producto devuelve un objeto con estos campos  "name": "-MUWJLw8GnsSIiPQywI3",
        const resData = await response.json() 

        console.log(resData)

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return {   
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title,
            description,
            imageUrl,
        }
    }
}