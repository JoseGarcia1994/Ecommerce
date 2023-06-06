import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk, filterCategoryThunk, searchCategoryThunk } from '../store/slices/product.slice';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

	const dispatch = useDispatch()
	const productList = useSelector(state => state.products)
	const [categories, setCategories] = useState([])
	const [searchValue, setSearchValue] = useState("")

	useEffect(() => {
		dispatch(getProductsThunk())

		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
			.then(resp => setCategories(resp.data))
			.catch(error => console.error(error))
	}, [])



	return (
		<div>
			<Row className='pt-5'>

				<Col md={4} lg={3}>

					<ListGroup className='w-100'>
						{
							categories.map(category => (
								<ListGroup.Item
									key={category.id}
									onClick={() => dispatch(filterCategoryThunk(category.id))}
								>
									{category.name}
								</ListGroup.Item>
							))
						}
					</ListGroup>

				</Col>

				<Col md={8} lg={9}>
					<InputGroup className="mb-3">
						<Form.Control
							placeholder="Search by name"
							aria-label="Search by name"
							aria-describedby="basic-addon2"
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
						/>
						<Button
							variant="outline-secondary"
							id="button-addon2"
							onClick={() => dispatch(searchCategoryThunk(searchValue))}
						>
							Search
						</Button>
					</InputGroup>
					<Row xs={1} md={2} lg={3} className='mt-5'>
						{
							productList.map(product => (
								<Col className='mb-3' key={product.id}>
									<Card className='w-100' style={{ height : "380px" }}>
										<Card.Img variant="top" src={product.images?.[0].url} style={{ height: 200 }} />
										<Card.Body>
											<Card.Title>{product.title}</Card.Title>
											<Card.Text>
												Price: {product.price}
											</Card.Text>
											<div className='w-100 d-flex'>
											<Button
												variant="primary"
												as={Link}
												to={`/product/${product.id}`}
											>
												<i className='bx bx-cart bx-xs'></i>
											</Button>
											</div>
											
										</Card.Body>
									</Card>
								</Col>
							))
						}

					</Row>
				</Col>
			</Row>
			<h1>Home</h1>

		</div>
	);
};

export default Home;