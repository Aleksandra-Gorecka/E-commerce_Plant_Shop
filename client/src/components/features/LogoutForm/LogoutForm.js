import { useEffect } from 'react';
import { AUTH_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/cartRedux';
import { Spinner } from 'react-bootstrap';

const LogoutForm = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'DELETE',
            credentials: 'include',
        }

        fetch(`${AUTH_URL}/logout`, options)
        .then (() => {
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            dispatch(clearCart())
            dispatch(logOut());
            setTimeout(() => {
                navigate('/');
            }, 2000);
        })
    }, [dispatch, navigate])


    return (
        <div>
            <p className="text-center my-5">Now you are logged out, see you soon!</p>
            <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
    
}

export default LogoutForm;