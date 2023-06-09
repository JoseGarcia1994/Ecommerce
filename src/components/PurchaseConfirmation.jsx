import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { purchaseCartThunk } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';

const PurchaseConfirmation = ({closePurchaseConfirmation, showPurchaseConfirmation}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const purchase = () => {
        dispatch(purchaseCartThunk())
        closePurchaseConfirmation()
        navigate("/purchases")
    }
    
    return (
        <div>
            <Modal show={showPurchaseConfirmation} onHide={closePurchaseConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to complete purchase?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Click close to go back to your cart!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closePurchaseConfirmation}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => purchase()}>
                        Buy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PurchaseConfirmation;