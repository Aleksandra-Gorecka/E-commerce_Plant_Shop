import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../../redux/cartRedux";
import { Row, Col, ListGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styles from './OrderForm.module.scss';
import { API_URL } from "../../../config";
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../../redux/productsRedux';

const OrderForm = () =>{

    const cart = useSelector(getCart);
    const products = useSelector(getAllProducts);
    const dispatch = useDispatch();
    const [orderTotal, setOrderTotal] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState(null);

    const getProductName = (productId) => {
      for (const product of products) {
        if (product.id === productId) {
          return product.name;
        }
      }
      return null;
    }

    useEffect(() => {
        const totalAmount = cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0).toFixed(2);
        setOrderTotal(totalAmount);
    }, [cart]);

    const handleOrderSubmit = async (e) => {
      e.preventDefault();
      setStatus('loading')

      if (
        !name ||
        !email ||
        !phone ||
        !street ||
        !zip ||
        !city ||
        !paymentMethod ||
        cart.length === 0
      ) {
        setStatus('clientError');
        return;
      }

      const orderData = {
        name: name,
        email: email,
        phone: Number(phone),
        shippingStreet: street,
        shippingZip: zip,
        shippingCity: city,
        paymentMethod: paymentMethod,
        orderTotal: Number(orderTotal),
        cartProducts: cart,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      };
      setStatus('loading');

      fetch(`${API_URL}/api/orders`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('success');
          dispatch(clearCart())
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus('serverError');
        console.log(status);
      });

    };

    return (
        <section style={{ width: '90%' }} className="m-auto">
            <h2 className="mb-4 text-center">Order Summary</h2>

            {status === 'clientError' && (
              <Alert variant="danger">
                Please fill in all required fields and make sure your cart is not empty.
              </Alert>
            )}
            {status === 'serverError' && (
              <Alert variant="danger">
                Something went wrong. Please try again later.
              </Alert>
            )}
            {status === 'success' && (
              <div className="text-center">
                <Alert variant="success">
                  Your order has been successfully submitted.
                </Alert>
                <Link to="/">
                  <Button variant="outline-success" className="shadow-none">Continue Shopping</Button>
                </Link>
              </div>
            )}
            {status === 'loading' && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {cart.length === 0 && status !== 'success' && (
              <div className="text-center">
                <Alert variant="info">Your cart is empty.</Alert>
                <Link to="/">
                  <Button variant="outline-success" className="shadow-none">Continue Shopping</Button>
                </Link>
              </div>
            )}
            {status !== 'success' && status !== 'loading' && cart.length !== 0 && (

              <div>
                <ListGroup>
                  <ListGroup.Item variant="success" key="header">
                    <Row>
                      <Col xs={12} sm={8} className={styles.bold_text}>
                        Name
                      </Col>
                      <Col xs={6} sm={2}>
                      </Col>
                      <Col xs={6} sm={2} className={`text-center ${styles.bold_text}`}>
                        Total Price
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {cart.map((cartItem) => (
                  <ListGroup.Item key={cartItem.productId}>
                    <Row>
                      <Col xs={12} sm={8} className={styles.bold_text}>
                        {getProductName(cartItem.productId)}
                      </Col>
                      <Col xs={6} sm={2}>
                        {cartItem.quantity} x {cartItem.price}$
                      </Col>
                      <Col xs={6} sm={2} className={`text-center ${styles.bold_text}`}>
                        {cartItem.quantity * cartItem.price}$
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12}>
                        Comment: {cartItem.comment}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-3 mb-3 text-end">
                  <h4>Order Total: {orderTotal}$</h4>
                </div>

                <div className="m-auto d-flex justify-content-center">
                  <Form className="mt-4">
                    <h2 className="my-4 text-center">Shipping Information:</h2>
                    <Form.Group className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control type="text" value={name} placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number:</Form.Label>
                      <Form.Control type="text" value={phone} placeholder="Enter your phone number" onChange={e => setPhone(e.target.value)}/>
                    </Form.Group>
                    <h4 className="mt-5 text-center">Address:</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Street: </Form.Label>
                      <Form.Control type="text" value={street} placeholder="Enter your street" onChange={e => setStreet(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP code: </Form.Label>
                      <Form.Control type="text" value={zip} placeholder="Enter your ZIP code" onChange={e => setZip(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>City: </Form.Label>
                      <Form.Control type="text" value={city} placeholder="Enter your City" onChange={e => setCity(e.target.value)}/>
                    </Form.Group>
                    <h4 className="mt-5 text-center">Payment:</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Payment Method: </Form.Label>
                      <Form.Control as="select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="" disabled>Select payment method</option>
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>BLIK</option>
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>

                <div className="mt-5 text-end">
                  <Button variant="success" className="shadow-none" onClick={handleOrderSubmit}>
                    Send Order
                  </Button>
                </div>
              </div>

            )}

        </section>
    )
}

export default OrderForm;