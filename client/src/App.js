import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from './redux/productsRedux';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header'
import Footer from './components/views/Footer'

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchProducts()), [dispatch]);

  return (
    <Container>
        <Header />
          Hello World
        <Footer />
    </Container>
  );
}

export default App;
