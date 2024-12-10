import Carousel from "react-bootstrap/Carousel";
import "./ItemCarousel.css";

const ProductCarousel = ({ item }) => {
  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        {item.image?.length === 0 ? (
          <div className="carousel__image__container">
            <img className="carousel__image" src={'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'} alt="item" />
          </div>
        ) : item.image?.length === 1 ? (
          <div className="carousel__image__container">
            <img className="carousel__image" src={item.image[0]} alt="item" />
          </div>
        ) : (
          <Carousel variant="dark" interval={4000}>
            {item.image?.map((img, index) => (
              <Carousel.Item key={index}>
                <div className="carousel__image__container">
                  <img
                    className="carousel__image"
                    src={img}
                    alt="img"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
