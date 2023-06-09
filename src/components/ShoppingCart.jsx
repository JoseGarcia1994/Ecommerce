import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, cartUpdateThunk, deleteProductsThunk } from '../store/slices/cart.slice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PurchaseConfirmation from './PurchaseConfirmation';
import Button from 'react-bootstrap/Button';


const ShoppingCart = ({ show, handleClose }) => {

	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);
  	const closePurchaseConfirmation = () => setShowPurchaseConfirmation(false);
  	const shoowPurchaseConfirmation = () => setShowPurchaseConfirmation(true);
	


	useEffect(() => {
		dispatch(getCartThunk())
	}, [])

	const decrementQty = product => {
		if (product.quantity > 1) {
			dispatch(cartUpdateThunk(product.id, product.quantity - 1))
		}

	}

	const incrementQty = product => {
		dispatch(cartUpdateThunk(product.id, product.quantity + 1))
	}

	const deleteProducts = product => {
		dispatch(deleteProductsThunk(product.id))
	}
	
	return (
		<div>
			<Offcanvas placement='end' show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Your Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className='cart-container'>
						{
							cart.map(product => (
								<li key={product.id} className='cart-product'>
									<Row>
										<Col>
											<img src={product.product.images[0].url} alt="" className='img-fluid' />
										</Col>
										<Col>
											<p>{product.product.brand}</p>
											<p className='cart-title'>{product.product.title}</p>
											<strong>Price:</strong> ${product.product.price * product.quantity}
										</Col>
									</Row>

									<div className='cart-counter-delete'>
										<div className='cart-counter'>
											<button onClick={() => decrementQty(product)}>
												<i className='bx bx-minus'></i>
											</button>
											{product.quantity}
											<button onClick={() => incrementQty(product)}>
												<i className='bx bx-plus' ></i>
											</button>

										</div>

										<div className='cart-delete'>
											<button onClick={() => deleteProducts(product)}><i className='bx bx-trash'></i></button>
										</div>
									</div>
								</li>
							))
						}
					</ul>
					{
						cart.length === 1 ?  <Button onClick={ () => shoowPurchaseConfirmation() } variant="dark">Buy</Button> : null 
					}
				</Offcanvas.Body>
			</Offcanvas>
			
			<PurchaseConfirmation 
			closePurchaseConfirmation={closePurchaseConfirmation}
			showPurchaseConfirmation={ showPurchaseConfirmation }
			/>
		</div>
	);
};

export default ShoppingCart;