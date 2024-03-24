import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Row } from "react-bootstrap";
import { getSearchedPoducts } from '../../../redux/productsRedux';
import ProductCart from '../ProductCart/ProductCart';

const SearchResult = () =>{

    const { searchPhrase } = useParams();
    const searchedProducts = useSelector((state) => getSearchedPoducts(state, searchPhrase));

    return (
        <section>
            {!searchedProducts.length &&
                <Alert>
                    <Alert.Heading>Nothing maches with your search request...</Alert.Heading>
                </Alert> 
            }
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {searchedProducts.map(product => (
                    <ProductCart key={ product.id } name={ product.name } price={ product.price } image={ product.image} id={ product.id} />
                ))}
            </Row>
        </section>
    )
}

export default SearchResult;