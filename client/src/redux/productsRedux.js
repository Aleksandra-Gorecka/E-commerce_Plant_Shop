import { API_URL } from '../config';

//selectors
export const getAllProducts = ({ products }) => products;
export const getProductById = ({ products }, id) => products.find(product => product.id === id);

//actions
const createActionName = actionName => `app/products/${actionName}`;
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

// action creators
export const loadProducts = payload => ({ type: LOAD_PRODUCTS, payload });

//API requests
export const fetchProducts = () => {
  return (dispatch) => {
  fetch(API_URL + '/products')
    .then(res => res.json())
    .then(products => dispatch(loadProducts(products)))
  };
};

//reducer
const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];
    default:
      return statePart;
  };
};


export default productsReducer;
