import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/product.slice';
import { useEffect } from 'react';
import SearchButton from '../components/home/SearchButton.jsx';
import Categories from '../components/home/Categories.jsx';
import Products from '../components/home/Products.jsx';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Home = () => {
	const dispatch = useDispatch()
	const productList = useSelector(state => state.products.products)

	useEffect(() => {
		dispatch(getProductsThunk())
	}, [])

	return (
		<Row className='pt-4'>
			<Col md={4} lg={3}>
				<Categories />
			</Col>

			<Col md={8} lg={9}>
				<SearchButton />
				<Row xs={1} sm={2} md={2} lg={3} xl={4} className='mt-5'>
					{
						productList.map(product => (
							<Products product={product} key={product.id} />
						))
					}
				</Row>
			</Col>
		</Row>
	);
};

export default Home;