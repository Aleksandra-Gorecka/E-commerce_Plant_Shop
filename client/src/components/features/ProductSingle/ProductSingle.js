import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from '../../../redux/productsRedux';
import { Navigate } from "react-router-dom";
import { Card, Col, Button } from 'react-bootstrap';
import styles from './ProductSingle.module.scss';
import { IMGS_URL } from "../../../config";

const ProductSingle = () =>{

    const { id } = useParams();
    const productData = useSelector(state => getProductById(state, id));
    console.log(productData)

    if (!productData) return <Navigate to={'/'} />;
    return (
        <section>
            <div className="d-flex justify-content-center">
				<Col className="py-4 d-flex justify-content-center">
					<Card className="text-center">
						<Card.Img 
                            className={`mx-auto ${styles.cartImg}`}
							src={IMGS_URL + productData.image}
						/>
					</Card>
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
                                <Button variant="outline-success m-1">
								    Add to Cart
							    </Button>
                            </div>
						</Card.Body>
                    </Card>
                </Col>
			</div>
        </section>
    )
}

export default ProductSingle;