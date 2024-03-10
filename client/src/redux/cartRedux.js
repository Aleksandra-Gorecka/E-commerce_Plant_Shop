//selectors
export const getCart = ({ cart }) => cart;

//actions
const createActionName = actionName => `app/cart/${actionName}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');

// action creators
export const addToCart = payload => ({ type: ADD_TO_CART, payload });

//reducer
const cartReducer = (statePart = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [...action.payload];
      default:
        return statePart;
    };
  };

  export default cartReducer;
