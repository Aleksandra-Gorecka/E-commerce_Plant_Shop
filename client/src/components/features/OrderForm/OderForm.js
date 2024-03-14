import { useSelector } from "react-redux";
import { getCart } from "../../../redux/cartRedux";
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import styles from './OrderForm.module.scss';

const OrderForm = () =>{

    const cart = useSelector(getCart);
    const [orderTotal, setOrderTotal] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    useEffect(() => {
        const totalAmount = cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0).toFixed(2);
        setOrderTotal(totalAmount);
    }, [cart]);

    console.log(cart);

    /* const createOrderData = () => {
      return {
        name: name,
        email: email,
        phone: phone,
        shippingStreet: street,
        shippingZip: zip,
        shippingCity: city,
        paymentMethod: paymentMethod,
        totalPrice: orderTotal,
        cartProducts: cart.products,
      };
    };

    handleOrderSubmit = () => {

    } */
    

    return (
        <section style={{ width: '80%' }} className="m-auto">
            <h2>Order Summary</h2>
            <ListGroup>
                <ListGroup.Item variant="success">
                <Row>
                  <Col xs={12} sm={8} className={styles.bold_text}>
                    Name
                  </Col>
                  <Col xs={6} sm={2}>
                  </Col>
                  <Col xs={6} sm={2} className={styles.bold_text}>
                    Total Price
                  </Col>
                </Row>
              </ListGroup.Item>
            {cart.map((cartItem) => (
              <ListGroup.Item key={cartItem.id}>
                <Row>
                  <Col xs={12} sm={8} className={styles.bold_text}>
                    {cartItem.name}
                  </Col>
                  <Col xs={6} sm={2}>
                    {cartItem.quantity} x {cartItem.price}$
                  </Col>
                  <Col xs={6} sm={2} className={styles.bold_text}>
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

          <div className="mt-3 mb-3">
            <h4>Order Total: {orderTotal}$</h4>
          </div>

          <div className="m-auto">
            <Form className="mt-4">
                <h2 className="my-4 text-center">Shipping Information:</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.email)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control type="text" value={phone} placeholder="Enter your phone number" onChange={e => setPhone(e.target.phone)}/>
                </Form.Group>
                <h4 className="mt-5 text-center">Address:</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Street: </Form.Label>
                    <Form.Control type="text" value={street} placeholder="Enter your street" onChange={e => setStreet(e.target.street)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ZIP code: </Form.Label>
                    <Form.Control type="text" value={zip} placeholder="Enter your ZIP code" onChange={e => setZip(e.target.zip)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>City: </Form.Label>
                    <Form.Control type="text" value={city} placeholder="Enter your City" onChange={e => setCity(e.target.city)}/>
                </Form.Group>
                <h4 className="mt-5 text-center">Payment:</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Payment Method: </Form.Label>
                    <Form.Control as="select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.paymentMethod)}>
                        <option value="" disabled>Select payment method</option>
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Blick</option>
                    </Form.Control>
                </Form.Group>
            </Form>
          </div>

          <div className="mt-5 text-end">
            <Button variant="success">
              Send Order
            </Button>
          </div>

        </section>
    )
}

export default OrderForm;