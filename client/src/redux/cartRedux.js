//selectors
export const getCart = ({ cart }) => cart;

//actions
const createActionName = actionName => `app/cart/${actionName}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_CART = createActionName('UPDATE_CART');
const DELETE_CART_ITEM = createActionName('DELETE_CART_ITEM');
const CLEAR_CART = createActionName('UPDATE_CLEAR');
const SAVE_CART_TO_LOCAL_STORAGE = createActionName('SAVE_CART_TO_LOCAL_STORAGE');
const UPDATE_FROM_LOCALSTORAGE = createActionName('UPDATE_FROM_LOCALSTORAGE');

// action creators
export const addToCart = payload => ({ type: ADD_TO_CART, payload });
export const updateCart = payload => ({ payload, type: UPDATE_CART });
export const deleteCartItem = payload => ({ payload, type: DELETE_CART_ITEM });
export const clearCart = () => ({ type: CLEAR_CART });
export const saveCartToLocalStorage = payload => ({ payload, type: SAVE_CART_TO_LOCAL_STORAGE });
export const updateFromLocalStorage = payload => ({ payload, type: UPDATE_FROM_LOCALSTORAGE });

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

      case SAVE_CART_TO_LOCAL_STORAGE:
        if (action.payload) {
            localStorage.setItem('cart', JSON.stringify(action.payload));
          }
        return statePart;
      
      case UPDATE_FROM_LOCALSTORAGE:
          return action.payload;

      default:
        return statePart;
    };
};

export default cartReducer;
