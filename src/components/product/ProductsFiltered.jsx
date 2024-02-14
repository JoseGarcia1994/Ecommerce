import { getProductThunk } from '../../store/slices/product.slice.jsx';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductsFiltered = () => {
  const { id } = useParams()
  const productsFiltered = useSelector(state => state.products.products.filter(product => product.id !== Number(id)))

  return (
    <>
      {
        productsFiltered.map(productFiltered => (
          <Col className='mb-3 card-col' key={productFiltered.id}>
            <Card className='w-100' style={{ height: "400px" }}>
              <Card.Img variant="top" src={productFiltered.images?.[0].url} style={{ height: 200 }} className='home-card-img' />
              <Card.Body>
                <div className='card-title-price'>
                  <h2 className='card-title'>{productFiltered.title}</h2>
                  <Card.Text>
                    <strong>Price:</strong>  ${productFiltered.price}
                  </Card.Text>
                </div>
                <div className='w-100 d-flex'>
                  <Button
                    variant="dark"
                    as={Link}
                    to={`/product/${productFiltered.id}`}
                    onClick={() => getProductThunk(productFiltered.id)}
                  >
                    View details
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        ))
      }
    </>

  );
};

export default ProductsFiltered;