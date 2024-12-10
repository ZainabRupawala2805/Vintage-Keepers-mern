import "./RelatedCard.css";
import { Link } from "react-router-dom";

const RelatedCard = ({ item }) => {
  return (
    <Link to={`/product/${item.category}/${item._id}`}>
      <div className="related__product__card__container">
        <div className="related__product__card__inner">
          <div className="related__product__image">
            <img
              src={item.image[0]}
              width="100%"
              height="auto"
              alt="item"
              className="product__img"
            />
          </div>
          <div className="related__product__card__detail">
            <div className="related__product__name">{item.name}</div>
            <div className="related__product__description">
              {/* <span>{item.description}</span> */}
            </div>
            <div className="related__product__price">
              <span>${item.price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RelatedCard;
