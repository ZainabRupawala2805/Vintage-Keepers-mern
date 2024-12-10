import "./ItemCard.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { useUser } from "../../../Context/UserContext";

const ItemCard = ({ item }) => {
  
  const { addToCart, user, addToWishlist } = useUser();

  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);

  // const handleAddToWishList = () => {
  //   wishItemsContext.addItem(item);
  // };
  
  // const handleAddToCart = () => {
    // };
    const handleAddToCart = async () => {
      if (!user) {
        toastError("You need to be logged in to add to the cart!");
        return;
      }
      
      await addToCart(item?._id);
      cartItemsContext.addItem(item, 1);
      toastSuccess("Product added to cart!");
    };
    
  const handleAddToWishlist = async () => {
    if (!user) {
      toastError("You need to be logged in to add to the wishlist!");
      return;
    }
    
    await addToWishlist(item?._id);
    wishItemsContext.addItem(item);
    toastSuccess("Product added to wishlist!");
  };

  
  return (
    <div className="product__card__card">
      <div className="product__card">
        <div
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img src={item.image[0]} alt="item" className="product__img" />
          ) : (
            <img src={item.image[0]} alt="item" className="product__img" />
          )}
        </div>
        <div className="product__card__detail">
          <div className="product__name">
            <Link to={`/product/${item.category}/${item._id}`}>{item.name}</Link>
          </div>
          {/* <div className="product__description">
                        <span>{item.description}</span>
                    </div> */}
          <div className="product__price">
            {item.quantity > 0 ? (
              <span>${item.price}</span>
            ) : (
              <span>
                <strike>${item.price}</strike> (Sold)
              </span>
            )}
          </div>
          <div className="product__card__action">
            <IconButton
              onClick={handleAddToWishlist}
              sx={{
                borderRadius: "20px",
                width: "40px",
                height:
                  "40px" /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
              }}
            >
              <FavoriteBorderIcon
                sx={{ width: "22px", height: "22px", color: "black" }}
              />
            </IconButton>
            {item.quantity > 0 && (
              <IconButton
                onClick={handleAddToCart}
                sx={{
                  borderRadius: "20px",
                  width: "40px",
                  height:
                    "40px" /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                }}
              >
                <AddShoppingCartIcon
                  sx={{ width: "22px", height: "22px", color: "black" }}
                />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
