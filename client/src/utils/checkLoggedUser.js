import { AUTH_URL } from '../config';
import { logIn } from '../redux/usersRedux';

export const checkLoggedUser = async (dispatch) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.email !== undefined && userData.email !== null) {
      dispatch(logIn(userData.email));
    } else {
      const response = await fetch(`${AUTH_URL}/user`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();

        if (
          userData &&
          userData.email !== undefined &&
          userData.email !== null
        ) {
          dispatch(logIn(userData.email));
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
    }
  } catch (error) {
    console.error('Error while checking logged-in user:', error);
  }
};