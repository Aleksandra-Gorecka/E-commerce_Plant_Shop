import ProductsList from "../../features/ProductsList/ProductsList";
import SearchForm from "../../features/SearchForm/SearchForm";

const Home = () =>{
    return (
        <section>
            <SearchForm />
            <ProductsList />
        </section>
    )
}

export default Home;