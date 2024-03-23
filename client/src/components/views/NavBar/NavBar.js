import { Container, Navbar, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { getCart } from "../../../redux/cartRedux";
import { useSelector } from "react-redux";

const NavBar = () =>{

    const user = useSelector((state) => state.user);
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);

    const cart = useSelector(getCart);
    const sumQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Navbar bg="success" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Navbar.Brand to="/" as={NavLink}>
                        Flora Market
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleExpanded}>
                    <FontAwesomeIcon icon={faBars} />
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link to="/" as={NavLink}>
                            Home
                        </Nav.Link>
                        {!user || user===null ? (
                            <>
                                <Nav.Link as={NavLink} to="/login">
						            Login
						        </Nav.Link>
                                <Nav.Link as={NavLink} to="/sign-up">
                                    Sign up
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link to="/logout" as={NavLink}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                        <Nav.Link to="/cart" as={NavLink}>
                            <FontAwesomeIcon icon={faBasketShopping} />
                            {cart.length !== 0 && <span className="ms-1">({sumQuantity})</span>}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavBar;
