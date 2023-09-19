import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { filterCategoryThunk } from "../store/slices/product.slice";
import { Link } from 'react-router-dom';
import { addCartThunk } from "../store/slices/cart.slice";


const ProductDetail = () => {

	const { id } = useParams()
	const [product, setProduct] = useState({})
	const [qty, setQty] = useState(0)
	const dispatch = useDispatch()
	const allProducts = useSelector(state => state.products)
	const productsFiltered = allProducts.filter(product => product.id !== Number(id))
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
			.then(resp => {
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

	const addtoCart = () => {
		const cart = {
			quantity: qty,
			productId: product.id
		}

		const tokenValue = localStorage.getItem("token")
		if (tokenValue) {
			dispatch(addCartThunk(cart))
		} else {
			navigate("/login")
		}
	}

	return (
		<div className="py-5">
			<h1 className="mx-5">{product.title}</h1>

			<Row className="pt-5 mb-5">
				<Col md={6} lg={7}>
					<Carousel className="w-60 ms-auto me-auto mt-4" variant="dark" >
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

				<Col md={6} lg={5} className="ps-5 pe-5">
					<p className="mt-3">{product.brand}</p>
					<p className="fs-">{product.description}</p>

					<Row>

						<Col sm={6} md={6} lg={6}>
							<p className="mb-1  price-counter-tittle">Price</p>
							<p>{product.price}</p>
						</Col>

						<Col sm={6} md={6} lg={6}>
							<p className="mb-1 price-counter-tittle">Quantity</p>
							<div className="product-detail-counter">

								<button
									type="button"
									className="btn-outline-secondary"
									onClick={() => decrement()}
								>
									<i className='bx bx-minus'></i>
								</button>

								<span>{qty}</span>

								<button
									type="button"
									className="btn-outline-secondary"
									onClick={() => setQty(qty + 1)}
								>
									<i className='bx bx-plus'></i>
								</button>

							</div>
						</Col>

					</Row>

					<Row className="ms-5 me-5 mt-3" style={{ justifyContent: "center" }}>
						<Button variant="dark" onClick={addtoCart} className="w-50">Add to cart <i className='bx bx-cart'></i></Button>
					</Row>

				</Col>
			</Row>

			<Row xs={1} md={3} lg={4} xl={4} className="related-product-container">
				{
					productsFiltered.map( product => (
						<Col className='mb-3 card-col' key={product.id}>
							<Card className='w-100' style={{ height: "400px" }}>
								<Card.Img variant="top" src={product.images?.[0].url} style={{ height: 200 }} className='home-card-img'/>
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
											onClick={ () => setProduct(product) }
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
		</div>
	);
};

export default ProductDetail;