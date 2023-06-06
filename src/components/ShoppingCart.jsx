import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const ShoppingCart = ({ show, handleClose }) => {

const dispatch = useDispatch()
const cart = useSelector( state => state.cart )

useEffect(() => {
	dispatch( getCartThunk() )
}, [])

	return (
		<div>

			<Offcanvas placement='end' show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Offcanvas</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					Some text as placeholder. In real life you can have the elements you
					have chosen. Like, text, images, lists, etc.
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
};

export default ShoppingCart;