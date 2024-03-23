import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import { useState } from 'react';
import { AUTH_URL } from '../../../config';
import { useForm } from 'react-hook-form';

const SignUpForm = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [status, setStatus] = useState(null); // null. 'loading', 'success', 'serverError', 'clientError', 'loginError'
    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleSignUpSubmit = () => {
        setStatus('loading')

        if (
            !email ||
            !password ||
            password !== passwordRepeat
          ) {
            setStatus('clientError');
            return;
        }
        
        const signUpData = {
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
        };

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        };
        setStatus('loading');

        
        fetch(`${AUTH_URL}/register`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                } else if (res.status === 400){
                    setStatus('clientError');
                } else if (res.status === 409){
                    setStatus('loginError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch(err => {
                setStatus('serverError');
            })
    }

    return (
        <Container className="d-flex flex-column align-items-center">

        <Form className="col-12 col-xl-6 col-md-6 col-sm-12 mx-auto" onSubmit={handleSubmit(handleSignUpSubmit)}>

            <h1 className="my-4 text-center">Sign up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully registered! You can now log in...</p>
                </Alert>
            )}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>No enough data</Alert.Heading>
                    <p>You have to fill all the fields.</p>
                </Alert>
            )}

            {status === "loginError" && (
                <Alert variant="warning">
                    <Alert.Heading>Login already in use</Alert.Heading>
                    <p>You have to use other login.</p>
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
                    type="email" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            {errors.email && <small className="d-block form-text text-danger text-center mb-4">Email is required</small>}
            

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formPassword">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Password</Form.Label>
                <Form.Control {...register("password", { required: true, minLength: 5 })}
                    type="password" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            {errors.password && errors.password.type === "required" && <small className="d-block form-text text-danger text-center mb-4">Password is required</small>}
            {errors.password && errors.password.type === "minLength" && <small className="d-block form-text text-danger text-center mb-4">Password must be at least 5 characters long</small>}
            

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formPasswordRepeat">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Confirm Password</Form.Label>
                <Form.Control {...register("passwordRepeat", { required: true, validate: value => value === password })}
                    type="password" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} placeholder="Password" />
            </Form.Group>
            {errors.passwordRepeat && errors.passwordRepeat.type === "required" && (
                <small className="d-block form-text text-danger text-center mb-4">Please confirm password</small>
            )}
            {errors.passwordRepeat && errors.passwordRepeat.type === "validate" && (
                <small className="d-block form-text text-danger text-center mb-4">Passwords do not match</small>
            )}

            <Button className="w-100" variant="success" type="submit">
                Sign up
            </Button>

        </Form>
        </Container>
    );
};

export default SignUpForm;