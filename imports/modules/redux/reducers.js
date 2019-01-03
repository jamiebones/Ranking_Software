import {_} from 'meteor/underscore';

export default (state = {}, { type, payload, stateProperty, ...rest }) => {
  const shoppingCart = state.shoppingCart || {};
  switch (type) {
    case 'ON_LOGIN':
      return { ...state, ...rest };
    case 'ON_LOGOUT':
      return { ...state, ...rest };
    case 'REMOVE_ITEM_FROM_CART':
      //removing items that matches an Id;
      let remainingCartItems = _.filter(state.shoppingCart.items,(item)=> {
        return item.id !== payload
    });
      state.shoppingCart.items = remainingCartItems;
      const remCartItems = Object.assign({}, state.shoppingCart)
      return {...state, shoppingCart:remCartItems, ...rest }
    case "ADD_ITEM_TO_CART":
      //shoppingCart = state.shoppingCart || {};
      let cart =  shoppingCart.items || [] ;
      let addedItem = _.find(cart , (cartItem)=>{
            return payload.id == cartItem.id;
        })
     
      if ( addedItem ){
        //item is already added so just return the reducer
        //addedItem.quantity = addedItem.quantity += 1;
       // cart.push( addedItem );
        //filter out the old one
       // let newCartItems = _.filter(shoppingCart.items,(item)=> {
       //    return item.id !== payload.id
       // });
       // shoppingCart.items = [...newCartItems, addedItem];
      //  const newCart = Object.assign({}, shoppingCart);
        return {...state, shoppingCart, ...rest}
      }
      else{
        //appending to the list;
        shoppingCart.items = [...cart, payload];
        const newCart = Object.assign({}, shoppingCart);
        return {...state, shoppingCart:newCart, ...rest }
      }
      case type:
        shoppingCart[stateProperty] = payload;
        let newObj = Object.assign({}, shoppingCart);
        return {...state, shoppingCart:newObj, ...rest }
      

    default:
      return state;
  }
};