import { useEffect } from 'react';
import { AUTH_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LogoutForm = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        }

        fetch(`${AUTH_URL}/logout`, options)
        .then (() => {
            localStorage.removeItem('user');
            dispatch(logOut());
            setTimeout(() => {
                navigate('/');
            }, 2000);
        })
    }, [dispatch, navigate])


    return <p className="text-center my-5">Now you are logged out, see you soon!</p>
}

export default LogoutForm;