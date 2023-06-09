import { useState, useEffect } from "react";
import axios from "axios";
import getConfig from "../utils/getConfig";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Purchases = () => {

	const [purchases, setPurchases] = useState([])
	useEffect(() => {

		axios
			.get(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, getConfig())
			.then(resp => setPurchases(resp.data))
			.catch(error => console.error(error))
	}, [])

	return (
		<div>
			<h1>Purchase History</h1>

			<ListGroup className="d-flex flex-column">
				{
					purchases.map( purchase => (
						<ListGroup.Item key={purchase.id}>
							<Row className="purchase-date-price">
								<Col>
									<p className="purchase-date-title">Purchase made:</p>
									<span>{purchase.updatedAt}</span>
								</Col>
								<Col>
									<p className="purchase-price-title">Total</p>
									<span>${purchase.product.price * purchase.quantity}</span>
								</Col>
							</Row>
							<Row>
								<Col lg={3}>
									<img src={purchase.product.images[0].url} alt="" className="purchase-img"/>
								</Col>

								<Col lg={5}>
									<Link to={`/product/${purchase.product.id}`}  className="purchase-title">
									<h1>{purchase.product.title}</h1>
									</Link>
									<p> Brand: <strong>{purchase.product.brand}</strong> </p>
									<p> Quantity: <strong>{purchase.quantity}</strong></p>
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