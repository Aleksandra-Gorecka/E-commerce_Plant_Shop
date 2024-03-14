import { useSelector } from "react-redux";
import { getCart } from "../../../redux/cartRedux";
import { Row, Col, Button, Nav } from "react-bootstrap";
import CartItem from "../CartItem/CartItem";
import { NavLink } from "react-router-dom";

const CartForm = () =>{

    const cart = useSelector(getCart);

    console.log(cart);

    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0).toFixed(2);

    return (
        <section>
            <Row className='mx-1 text-center'><h2>Your Cart</h2></Row>
            {cart.length === 0 ? (
                <Row className='mx-1 p-4 text-center'><p>Your Cart is empty.</p></Row>
                ) : (
            <>
                <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                    {cart.map(cartItem => (
                        <CartItem 
                            key={ cartItem.id } 
                            name={cartItem.name} 
                            price ={cartItem.price} 
                            quantity={cartItem.quantity}
                            comment={cartItem.comment}
                            id={cartItem.id}
                        />
                    ))}
                </Row>
                <Row className='mx-1 mt-4'>
                    <Col>
                        <h2>Total: ${totalAmount}</h2>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Nav.Link to="/ordersummary" as={NavLink}>
                            <Button variant="success">Order Summary</Button>
                        </Nav.Link>
                    </Col>
                </Row>
            </>
      )}
        </section>
    )
}

export default CartForm;