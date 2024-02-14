import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "../store/slices/product.slice";
import { addCartThunk } from "../store/slices/cart.slice";
import CarouselItem from "../components/product/CarouselItem.jsx";
import ProductQuantity from "../components/product/ProductQuantity.jsx";
import ProductsFiltered from "../components/product/ProductsFiltered.jsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const ProductDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { quantity, product } = useSelector(state => state.products)

	useEffect(() => {
		dispatch(getProductThunk(id))
	}, [product])

	const addtoCart = () => {
		const cart = {
			quantity,
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
					<CarouselItem product={product} />
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
							<ProductQuantity />
						</Col>
					</Row>

					<Row className="ms-5 me-5 mt-3" style={{ justifyContent: "center" }}>
						<Button variant="outline-dark" onClick={addtoCart} className="w-50">Add to cart <i className='bx bx-cart'></i></Button>
					</Row>
				</Col>
			</Row>

			<Row xs={1} md={3} lg={4} xl={4} className="related-product-container">
				<ProductsFiltered />
			</Row>
		</div>
	);
};

export default ProductDetail;