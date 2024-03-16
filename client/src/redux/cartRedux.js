//selectors
export const getCart = ({ cart }) => cart;

//actions
const createActionName = actionName => `app/cart/${actionName}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_CART = createActionName('UPDATE_CART');
const DELETE_CART_ITEM = createActionName('DELETE_CART_ITEM');
const CLEAR_CART = createActionName('UPDATE_CLEAR');

// action creators
export const addToCart = payload => ({ type: ADD_TO_CART, payload });
export const updateCart = payload => ({ payload, type: UPDATE_CART });
export const deleteCartItem = payload => ({ payload, type: DELETE_CART_ITEM });
export const clearCart = () => ({ type: CLEAR_CART });

//reducer
const cartReducer = (statePart = [], action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const { productId, quantity } = action.payload;
        const existingProduct = statePart.find(cartItem => cartItem.productId === productId);
        return existingProduct
          ? statePart.map(cartItem =>
              cartItem.productId === productId
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          : [...statePart, { ...action.payload }];
      };

      case UPDATE_CART: {
        const { payload } = action;
        return statePart.map(cartItem =>
          cartItem.productId === payload.productId
          ? { ...cartItem, ...payload }
          : cartItem
        );
      };

      case DELETE_CART_ITEM: 
        return statePart.filter((cartItem) => cartItem.productId !== action.payload);
      
      case CLEAR_CART:
        return [];

      default:
        return statePart;
    };
};

export default cartReducer;
