import Carousel from 'react-bootstrap/Carousel';

const CarouselItem = ({ product }) => {
  return (
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
  );
};

export default CarouselItem;