import { useSelector } from "react-redux";
import { getCart } from "../../../redux/cartRedux";
import { Row, Col, Button } from "react-bootstrap";
import CartItem from "../CartItem/CartItem";

const CartForm = () =>{

    const cart = useSelector(getCart);
    console.log(cart);

    return (
        <section>
            <Row className='mx-1 text-center'><h2>Your Cart</h2></Row>
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {cart.map(cartItem => (
                    <CartItem 
                        key={ cartItem.id } 
                        name={cartItem.name} 
                        image={cartItem.image} 
                        price ={cartItem.price} 
                        quantity={cartItem.quantity}
                    />
                ))}
            </Row>
            <Row className='mx-1'>
                <Col>
                    <h2>Total: $</h2>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="success">Order Summary</Button>
                </Col>
            </Row>
        </section>
    )
}

export default CartForm;