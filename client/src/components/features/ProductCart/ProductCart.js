import { Card, Button } from "react-bootstrap";
import styles from './ProductCart.module.scss';
import { IMGS_URL } from "../../../config";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCart = ({ name, price, image, id }) => {

    return (
        <Card className="col-lg-4 col-sm-12 col-md-8 mx-3 py-2 my-2" style={{ maxWidth: '18rem' }}>
            <Card.Img variant="top"  className={styles.cardImage} src={IMGS_URL + image } />
            <Card.Body>
                <div className="d-flex mb-2">
                    <Card.Title>{ name }</Card.Title>
                    <Card.Subtitle className="mt-auto mb-auto text-muted ms-auto">${ price }</Card.Subtitle>
                </div>
                <Link to={`/product/${id}`}>
                    <Button variant="success" className="shadow-none">Read more...</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

ProductCart.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default ProductCart;