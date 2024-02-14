import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const Products = ({ product }) => {
  return (
    <Col className='mb-3'>
      <Card className='w-100' style={{ height: "400px" }}>
        <Card.Img variant="top" src={product.images?.[0].url} style={{ height: 200 }} className='home-card-img' />
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
            >
              View details
            </Button>
          </div>

        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;