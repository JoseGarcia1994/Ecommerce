import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk } from "../store/slices/product.slice";
import { Link } from 'react-router-dom';


const ProductDetail = () => {

	const { id } = useParams()
	const [product, setProduct] = useState({})
	const [qty, setQty] = useState(0)
	const dispatch = useDispatch()
	const allProducts = useSelector(state => state.products)
	const productsFiltered = allProducts.filter(product => product.id !== Number(id))

	useEffect(() => {
		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
			.then(resp => {
				console.log(resp.data);
				setProduct(resp.data)
				dispatch(filterCategoryThunk(resp.data.category.id))
			})
			.catch(error => console.error(error))
	}, [])

	const decrement = () => {
		if (qty > 1) {
			setQty(qty - 1)
		}
	}

	return (
		<div className="py-5">
			<h1>{product.title}</h1>

			<Row className="pt-5 mb-5">
				<Col lg={7}>
					<Carousel className="w-60 ms-auto me-auto mt-4" >
						<Carousel.Item>
							<img
								className="d-block ms-auto me-auto "
								src={product.images?.[0].url}
								alt="image1"
								style={{ width: "300px", height: "300px" }}
							/>
						</Carousel.Item>

						<Carousel.Item>
							<img
								className="d-block w-100"
								src={product.images?.[1].url}
								alt="image2"
								style={{ height: "300px", objectFit: "contain" }}
							/>
						</Carousel.Item>

						<Carousel.Item>
							<img
								className="d-block w-100"
								src={product.images?.[2].url}
								alt="image3"
								style={{ height: "300px", objectFit: "contain" }}
							/>
						</Carousel.Item>
					</Carousel>
				</Col>

				<Col lg={5} className="ps-5 pe-5">
					<p className="mt-3">{product.title}</p>
					<p className="fs-">{product.description}</p>

					<Row>

						<Col sm={6} md={6} lg={6}>
							<p className="mb-1">Price</p>
							<p>{product.price}</p>
						</Col>

						<Col sm={6} md={6} lg={6}>
							<p className="mb-1">Quantity</p>
							<Button onClick={() => decrement()} variant="secondary" size="sm">-</Button>
							<span>{qty}</span>
							<Button onClick={() => setQty(qty + 1)} variant="secondary" size="sm">+</Button>
						</Col>

					</Row>

					<Row className="ms-5 me-5 mt-3" style={{ justifyContent : "center" }}>
						<Button className="primary w-75 ">Add to cart <i className='bx bx-cart'></i></Button>
					</Row>
					
				</Col>
			</Row>

			<Row  xs={1} md={3} lg={4} xl={4} className="related-product-container">
					{
						productsFiltered.map(product => (
							<Col className='mb-3 col-container' key={product.id}>
								<Card className='w-100 card-container'>
									<Card.Img variant="top" src={product.images?.[0].url} style={{ height: 200 }} />
									<Card.Body>
										<Card.Title>{product.title}</Card.Title>
										<Card.Text>
											Price: {product.price}
										</Card.Text>
										<Button
											variant="primary"
											as={Link}
											to={`/product/${product.id}`}
										>
											<i className='bx bx-cart bx-xs'></i>
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))
					}
				
			</Row>
		</div>
	);
};

export default ProductDetail;