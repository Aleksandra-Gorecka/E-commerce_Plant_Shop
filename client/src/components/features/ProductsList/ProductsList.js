import { useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/productsRedux";
import { Spinner, Row } from "react-bootstrap";
import ProductCart from "../ProductCart/ProductCart";

const ProductsList = () =>{

    const products = useSelector(getAllProducts);
    //console.log(ads);

    return (
        <section>
            {products.length < 1 && 
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {products.map(product => (
                    <ProductCart key={ product.id } name={ product.name } price={ product.price } description={ product.description} image={ product.image} id={ product.id} />
                ))}
            </Row>
        </section>
    )
}

export default ProductsList;