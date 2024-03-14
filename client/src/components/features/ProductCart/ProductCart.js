import { Card, Button } from "react-bootstrap";
import styles from './ProductCart.module.scss';
import { IMGS_URL } from "../../../config";
import { NavLink } from 'react-router-dom';

const ProductCart = ({ name, price, description, image, id }) => {

    return (
        <Card className="col-lg-4 col-sm-12 col-md-8 mx-3 py-2 my-2" style={{ maxWidth: '18rem' }}>
            <Card.Img variant="top"  className={styles.cardImage} src={IMGS_URL + image } />
            <Card.Body>
                <div className="d-flex">
                    <Card.Title>{ name }</Card.Title>
                    <Card.Subtitle className="mt-auto mb-auto text-muted ms-auto">${ price }</Card.Subtitle>
                </div>
                <NavLink to={`/product/${id}`} >
                    <Button variant="secondary" >Read more...</Button>
                </NavLink>
            </Card.Body>
        </Card>
    )
}

export default ProductCart;