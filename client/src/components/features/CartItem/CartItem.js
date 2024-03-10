import { Card, Row, Col, Form, Button } from "react-bootstrap"
import { IMGS_URL } from "../../../config";
import QuantityWidget from "../../common/QuantityWidget/QuanityWidget";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './CartItem.module.scss';

const CartItem = ({name, image, price, quantity }) =>{

    const [quantityUpdate, setQuantityUpdate] = useState(quantity);
    const [comment, setComment] = useState({});

    const handleQuantityChange = newQuantity => {
        setQuantityUpdate(newQuantity);
    };

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    return (
        <Card className="mx-3 py-2 my-2" style={{ maxWidth: '60rem' }}>
            <Row className="d-flex align-items-center">
                <Col xs={6} md={3} className="text-center mb-2">
                    <Card.Img variant="top" src={IMGS_URL + image } className={styles.cardImage}/>
                </Col>
                <Col xs={6} md={3}>
                    <Card.Title className="mb-4">{name}</Card.Title>
                    <Card.Subtitle className="d-flex">
                        <div>Price: </div>
                        <div>${price}</div>
                    </Card.Subtitle>
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-end">
                    <QuantityWidget onCountChange={handleQuantityChange} initialValue={quantity} />
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-space-between" >
                    <div>Total Price: </div>
                    <div>${(price * quantityUpdate).toFixed(2)}</div>
                </Col>
            </Row>
            <Row className="m-2">
                <Col xs={12} md={4} className="mb-2">
                    <Form.Control
                        variant="success"
                        type="text"
                        placeholder="Add comment"
                        onChange={handleCommentChange}
                    />
                </Col>
                <Col xs={12} md={4}>
                    <Button variant="success">Add comment</Button>
                </Col>
                <Col className="d-flex justify-content-end m-auto">
                    <FontAwesomeIcon icon={faTrashCan} />
                </Col>
            </Row>
        </Card>
    )
}

export default CartItem;