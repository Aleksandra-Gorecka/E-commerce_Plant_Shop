import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { AUTH_URL } from '../../../config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../../redux/usersRedux';
import { useForm } from 'react-hook-form';

const LoginForm = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null); // null. 'loading', 'success', 'serverError', 'clientError'
    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Funkcja do ręcznego odkodowywania tokenu JWT
const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
    return JSON.parse(jsonPayload);
};

    const handleLoginSubmit = () => {
        setStatus('loading');

        if (
            !email ||
            !password
          ) {
            setStatus('clientError');
            return;
        }

        const userLoginData = {
            email: email,
            password: password,
        };
 
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userLoginData),
            credentials: 'include',
		};

		setStatus('loading');
		fetch(`${AUTH_URL}/login`, options)
			.then(res => {
				if (res.status === 201) {
                    setStatus('success');
                    dispatch(logIn({ email }));
					setTimeout(() => {
						navigate('/');
					}, 2000);
				} else if (res.status === 401) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			})
			.catch(err => {
				setStatus('serverError');
			});
	}; 

    return (
        <Form className="col-12 col-xl-6 col-md-6 col-sm-12 mx-auto" onSubmit={handleSubmit(handleLoginSubmit)}>

            <h1 className="my-4 text-center">Log in</h1>

            {status === "success" && (
                <div>
                    <Alert variant="success">
                        <Alert.Heading>Success!</Alert.Heading>
                        <p>You have been successfully logged in!</p>
                    </Alert>
                    <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or Password are incorrect...</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formEmail">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Email</Form.Label>
                <Form.Control {...register("email", { required: true })}
                    type="text" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            {errors.email && <small className="d-block form-text text-danger text-center mb-4">Email is required</small>}

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formPassword">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Password</Form.Label>
                <Form.Control {...register("password", { required: true })}
                    type="password" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            {errors.password && <small className="d-block form-text text-danger text-center mb-4">Password is required</small>}

            <Button className="my-2 w-100 shadow-none" variant="success" type="submit">
                Log in
            </Button>

        </Form>
    )
}

export default LoginForm;