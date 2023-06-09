import { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Pagination from "../components/Pagination";


const Purchases = () => {

	const [purchases, setPurchases] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [purchasePerPage, setPurchasePerPage] = useState(4)
	const indexOfLastPurchase = currentPage * purchasePerPage

	useEffect(() => {

		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, getConfig())
			.then(resp => setPurchases(resp.data))
			.catch(error => console.error(error))
	}, [])

	let purchaseCount = purchases.length

	/* Pagination */
	const totalPages = Math.ceil(purchaseCount / purchasePerPage)
	const currentPurchases = purchases?.slice(indexOfLastPurchase - purchasePerPage, indexOfLastPurchase)
	const arrPages = []
	const pages = () => {
		for (let i = 1; i <= totalPages; i++) {
			arrPages.push(i)
		}
	}
	pages()

	let show
	const showPages = () => {
		if (totalPages > 10) {
			if (currentPage > totalPages - 5) {
				show = arrPages.slice(totalPages - 10, totalPages)
			} else if (currentPage > 5) {
				show = arrPages.slice(currentPage - 5, currentPage + 5)
			} else {
				show = arrPages.slice(0, 10)
			}
		} else {
			show = arrPages.slice(0, totalPages)
		}
	}
	showPages()

	return (
		<div>
			<h1 className="purchase-history">Purchase History</h1>

			<div className="purchase-pagination">
				{
					show.map((num) => (
						<Pagination
							setCurrentPage={setCurrentPage}
							num={num}
							key={num}
						/>
					))
				}

			</div>

			<ListGroup className="d-flex flex-column">
				{
					currentPurchases.map(purchase => (
						<ListGroup.Item key={purchase.id}>
							<Row className="purchase-date-price">
								<Col lg={6}>
									<p className="purchase-date-title">Purchase made:</p>
									<span>{Date(purchase.updatedAt)}</span>
								</Col>
								<Col lg={3}>
									<p className="purchase-price-title">Total</p>
									<span>${purchase.product.price * purchase.quantity}</span>
								</Col>
								<Col lg={3}>
									<p className="purchase-qty-title"> Quantity:</p>
									<span>{purchase.quantity}</span>
								</Col>
							</Row>
							<Row>
								<Col lg={3}>
									<img src={purchase.product.images[0].url} alt="" className="purchase-img" />
								</Col>

								<Col lg={5}>
									<Link to={`/product/${purchase.product.id}`} className="purchase-title">
										<h1>{purchase.product.title}</h1>
									</Link>
									<p> Brand: <strong>{purchase.product.brand}</strong> </p>
									<p> Price: <strong>${purchase.product.price}</strong> </p>
								</Col>
							</Row>


						</ListGroup.Item>
					))
				}
			</ListGroup>
		</div>
	);
};

export default Purchases;