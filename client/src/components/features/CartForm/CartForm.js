import { useSelector } from "react-redux";
import { getCart } from "../../../redux/cartRedux";
import { Row, Col, Button, Modal } from "react-bootstrap";
import CartItem from "../CartItem/CartItem";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartForm = () =>{

    const cart = useSelector(getCart);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0).toFixed(2);

    
      const handleOrderSummary = () => {
        if (user) navigate('/ordersummary');
        else if(!user || user===null) setShowModal(true)
      }

    return (
        <section>
            <Row className='mx-1 text-center'><h2>Your Cart</h2></Row>
            {cart.length === 0 ? (
                <div className='mx-1 p-4 text-center'>
                    <Row><p>Your Cart is empty.</p></Row>
                    <Link to="/">
                        <Button variant="outline-success" className="shadow-none">Continue Shopping</Button>
                    </Link>
                </div>
                ) : (
            <>
                <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                    {cart.map(cartItem => (
                        <CartItem 
                            key={ cartItem.productId }
                            price ={cartItem.price} 
                            quantity={cartItem.quantity}
                            comment={cartItem.comment}
                            productId={cartItem.productId}
                        />
                    ))}
                </Row>
                <Row className='mx-1 mt-4'>
                    <Col>
                        <h2>Total: ${totalAmount}</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                            <Button variant="success" className="shadow-none" onClick={() => handleOrderSummary()}>Order Summary</Button>
                    </Col>
                </Row>
            </>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Alert</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <p>
						You need to be logged in.
						<br /> Please log in or sign up to be able proceed with your order.
					</p>
                </Modal.Body>
				<Modal.Footer>
                    <Link to="/login">
                        <Button variant="outline-success" className="shadow-none">Login</Button>
                    </Link>
                    <Link to="/sign-up">
                        <Button variant="outline-success" className="shadow-none">Sign Up</Button>
                    </Link>
				</Modal.Footer>
			</Modal>
        </section>
    )
}

export default CartForm;