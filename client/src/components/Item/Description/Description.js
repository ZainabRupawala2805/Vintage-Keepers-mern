import "./Description.css";

const Description = ({ item }) => {
  return (
    <div className="product__description__product">
      <div className="description__header__container">
        <div className="description__header__line"></div>
        <div className="description__header">Details</div>
      </div>
      <div className="description__detail__container">
        <div className="description__detail">
          {/* <p>{item.details}</p> */}
          <div
            className="product-container"
            dangerouslySetInnerHTML={{ __html: item.details }}
          ></div>
        </div>
      </div>
      {/* <div className="product__description__product"> */}
      <div className="description__header__container">
        <div className="description__header__line"></div>
        <div className="description__header ml-3">Highlights</div>
      </div>
      {/* </div> */}
      <div className="description__detail__container">
        <div className="description__detail">
          <ul>
            {item.highlights.map((highlight) => (
              <li>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description;
