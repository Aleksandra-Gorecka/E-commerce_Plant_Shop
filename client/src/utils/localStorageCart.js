import { updateFromLocalStorage } from "../redux/cartRedux";

export const localStorageCart = async (dispatch) => {
  try {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));

    if (localStorageCart && localStorageCart.length > 0 ) {
      dispatch(updateFromLocalStorage(localStorageCart));
    } 
  } catch (error) {
    console.error('Error while checking localStorage:', error);
  }
};