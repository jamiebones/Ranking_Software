/*eslint-disable*/

export const trial = (text) => {
    return {
        type: 'trial',
        payload: text
    }
}


export const addItemToCart = ( item ) => {
    return {
        type: 'ADD_ITEM_TO_CART',
        payload: item
    }
}

export const removeItemFromCart = ( item ) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        payload: item
    }
}

export const saveCustomerDetails = ( { stateObject, stateValue, 
                                       stateProperty }) => {
    return {
        type: stateObject,
        payload: stateValue,
        stateProperty
    }
}