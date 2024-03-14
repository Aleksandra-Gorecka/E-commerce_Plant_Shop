//selectors
export const getCart = ({ cart }) => cart;

//actions
const createActionName = actionName => `app/cart/${actionName}`;
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_CART = createActionName('UPDATE_CART_ITEM');

// action creators
export const addToCart = payload => ({ type: ADD_TO_CART, payload });
export const updateCart = (payload) => ({ payload, type: UPDATE_CART });

//reducer
const cartReducer = (statePart = [], action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const { id, quantity } = action.payload;
        const existingProduct = statePart.find(product => product.id === id);
        return existingProduct
          ? statePart.map(product =>
              product.id === id
                ? { ...product, quantity: product.quantity + quantity }
                : product
            )
          : [...statePart, { ...action.payload }];
      };

      case UPDATE_CART: {
        const { payload } = action;
        return statePart.map(product =>
          product.id === payload.id
          ? { ...product, ...payload }
          : product
        );
      };

      default:
        return statePart;
    };
};

export default cartReducer;
