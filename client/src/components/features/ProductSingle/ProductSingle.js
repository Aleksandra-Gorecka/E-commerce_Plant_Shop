import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from '../../../redux/productsRedux';
import { Navigate } from "react-router-dom";
import { Card, Col, Button, Carousel } from 'react-bootstrap';
import styles from './ProductSingle.module.scss';
import { IMGS_URL } from "../../../config";
import QuantityWidget from "../../common/QuantityWidget/QuanityWidget";
import { addToCart } from "../../../redux/cartRedux";
import { useState } from "react";

const ProductSingle = () =>{

    const { id } = useParams();
    const productData = useSelector(state => getProductById(state, id));
    const dispatch = useDispatch();
    console.log(productData.gallery);

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
            <div className="d-flex justify-content-center">
				<Col className="py-4 d-flex justify-content-center">
                    <Carousel style={{ maxWidth: '280px' }}>
                    photos
                    </Carousel>
                    
				</Col>
                <Col className="py-4 d-flex align-items-stretch">
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
			</div>
        </section>
    )
}

export default ProductSingle;