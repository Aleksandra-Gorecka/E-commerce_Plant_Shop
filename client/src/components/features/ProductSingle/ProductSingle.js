import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from '../../../redux/productsRedux';
import { Navigate } from "react-router-dom";
import { Card, Col, Button, Carousel, Row } from 'react-bootstrap';
import styles from './ProductSingle.module.scss';
import { IMGS_URL } from "../../../config";
import QuantityWidget from "../../common/QuantityWidget/QuanityWidget";
import { addToCart } from "../../../redux/cartRedux";
import { useState } from "react";

const ProductSingle = () =>{

    const { id } = useParams();
    const productData = useSelector(state => getProductById(state, id));
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    const handleCountChange = (count) => {
        setQuantity(count);
    };

    const handleAddToCart = (productData) => {
        const cartProductData = {};
        cartProductData.productId = productData.id;
        cartProductData.price = productData.price;
        cartProductData.quantity = quantity;
        dispatch(addToCart(cartProductData));
    };

    if (!productData) return <Navigate to={'/'} />;
    return (
        <section>
            <Row className="d-flex justify-content-center">
				<Col xs={12} sm={6} className="py-4 d-flex justify-content-center">
                    <Carousel style={{ maxHeight: '400px' , maxWidth: '280px' }}>
                        <Carousel.Item key={'cover'}>
						        <Card.Img 
                                    className={`mx-auto ${styles.cartImg}`}
							        src={IMGS_URL + productData.image}
                                    alt={productData.name}
						        />
                        </Carousel.Item>
                        {productData.gallery.map((photo, index) => (
                            <Carousel.Item key={index}>
                                    <Card.Img
                                        className={`mx-auto ${styles.cartImg}`}
                                        src={IMGS_URL + photo.image}
                                    />
                                </Carousel.Item>
                            ))}
                    </Carousel>
                    
				</Col>
                <Col xs={12} sm={6} className="py-4 d-flex align-items-stretch">
                    <Card border="light">
                        <Card.Title className="text-center p-2">{productData.name}</Card.Title>
                        <Card.Body className="d-flex flex-column justify-content-space-between">
                            <div>
								<b>Description:</b> <br />
								<p className={styles.productDescribtion}>{productData.description}</p>
							</div>
                            <div className="mt-auto">
                                <p>
								    <b>Price: </b>
								    {productData.price}$
							    </p>
                                <div className="d-flex">
                                    <QuantityWidget onCountChange={handleCountChange}/>
                                    <Button variant="outline-success m-1" onClick={() => handleAddToCart(productData)}>
								        Add to Cart
							        </Button>
                                </div>
                            </div>
						</Card.Body>
                    </Card>
                </Col>
			</Row>
        </section>
    )
}

export default ProductSingle;