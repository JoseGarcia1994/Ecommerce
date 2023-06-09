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
					<InputGroup className="my-3">
						<Form.Control
							placeholder="Search by name"
							aria-label="Search by name"
							aria-describedby="basic-addon2"
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
						/>
						<Button
							variant="dark"
							id="button-addon2"
							onClick={() => dispatch(searchCategoryThunk(searchValue))}
						>
							Search
						</Button>
					</InputGroup>
					<Row xs={1} sm={2} md={2} lg={3} xl={4} className='mt-5'>
						{
							productList.map(product => (
								<Col className='mb-3' key={product.id}>
									<Card className='w-100' style={{ height: "400px" }}>
										<Card.Img variant="top" src={product.images?.[0].url} style={{ height: 200 }} className='home-card-img' />
										<Card.Body>
											<div className='card-title-price'>
												<h2 className='card-title'>{product.title}</h2>
												<Card.Text>
													<strong>Price:</strong>  ${product.price}
												</Card.Text>
											</div>
											<div className='w-100 d-flex'>
												<Button
													variant="dark"
													as={Link}
													to={`/product/${product.id}`}
												>
													View details
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

		</div>
	);
};

export default Home;