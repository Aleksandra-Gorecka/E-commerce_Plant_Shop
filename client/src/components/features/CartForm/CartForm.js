import { useSelector } from "react-redux";
import { getCart } from "../../../redux/cartRedux";
import { Row, Col, Button } from "react-bootstrap";
import CartItem from "../CartItem/CartItem";
import { Link } from 'react-router-dom';

const CartForm = () =>{

    const cart = useSelector(getCart);

    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0).toFixed(2);

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
                        <Link to="/ordersummary">
                            <Button variant="success" className="shadow-none">Order Summary</Button>
                        </Link>
                    </Col>
                </Row>
            </>
            )}
        </section>
    )
}

export default CartForm;