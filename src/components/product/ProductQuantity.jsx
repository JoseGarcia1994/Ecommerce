import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/slices/product.slice.jsx";
import Button from "../Button.jsx";

const ProductQuantity = () => {
  const dispatch = useDispatch()
  const { quantity } = useSelector(state => state.products)
  
  return (
    <>
      <p className="mb-1 price-counter-tittle">Quantity</p>
      <div className="product-detail-counter">
        <Button onClick={() => dispatch(decrement())}>
          <i className='bx bx-minus bx-xs'></i>
        </Button>

        <span>{quantity}</span>

        <Button onClick={() => dispatch(increment())}>
          <i className='bx bx-plus bx-xs'></i>
        </Button>
      </div>
    </>
  );
};

export default ProductQuantity;