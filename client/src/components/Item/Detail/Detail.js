import { useContext, useState } from "react";
import "./Detail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useUser } from "../../../Context/UserContext";
import { toastError, toastSuccess } from "../../Toast/Toast";

const Detail = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(item.size[0]);

  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  const { addToCart, user, addToWishlist } = useUser();

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handelQuantityIncrement = (event) => {
    setQuantity(Number(quantity) + 1);
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity(Number(quantity) - 1);
    }
  };

  const handelAddToCart = async () => {
    if (!user) {
      toastError("You need to be logged in to add to the cart!");
      return;
    }

    await addToCart(item?._id);
    cartItems.addItem(item, quantity, size);
    toastSuccess("Product added to cart!");
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toastError("You need to be logged in to add to the wishlist!");
      return;
    }

    await addToWishlist(item?._id);
    wishItems.addItem(item);
    toastSuccess("Product added to wishlist!");
  };

  return (
    // <div className="product__detail__container">
    //   <div className="product__detail">
    //     <div className="product__main__detail">
    //       <div className="product__color">
    //         <div className="product-color-label">Category: </div>
    //         <div
    //           className=""
    //           //   style={{ backgroundColor: `${item.color}` }}
    //         >
    //             {item.category}
    //         </div>
    //       </div>
    //       <div className="product__name__main">{item.name}</div>
    //       <div className="product__detail__description">{item.description}</div>
    //       {item.color && (
    //         <div className="product__color">
    //           <div className="product-color-label">Color: </div>
    //           <div
    //             className="product-color"
    //             style={{ backgroundColor: `${item.color}` }}
    //           ></div>
    //         </div>
    //       )}
    //       <div className="product__price__detail">
    //         Price: ${Number(item.price).toFixed(2)}
    //       </div>
    //     </div>
    //     <div className="product size">
    //       {item.size?.length === 0 ? (
    //         ""
    //       ) : item.size?.length === 1 ? (
    //         <>Size: {item.size[0]}</>
    //       ) : (
    //         <Box sx={{ minWidth: 100 }}>
    //           <FormControl fullWidth size="small">
    //             <InputLabel>Size</InputLabel>
    //             <Select value={size} label="size" onChange={handleSizeChange}>
    //               {item.size.map((size) => (
    //                 <MenuItem value={size}>{size}</MenuItem>
    //               ))}
    //             </Select>
    //           </FormControl>
    //         </Box>
    //       )}
    //     </div>
    //     <form onSubmit={handelAddToCart} className="product__form">
    //       <div className="product__quantity__and__size">
    //         <div className="product__quantity">
    //           <IconButton onClick={handelQuantityIncrement}>
    //             <AddCircleIcon />
    //           </IconButton>
    //           <div type="text" name="quantity" className="quantity__input">
    //             {quantity}
    //           </div>
    //           <IconButton onClick={handelQuantityDecrement}>
    //             <RemoveCircleIcon fontSize="medium" />
    //           </IconButton>
    //         </div>
    //       </div>

    //       <div className="collect__item__actions">
    //         <div className="add__cart__add__wish">
    //           <div className="add__cart">
    //             <Button
    //               variant="outlined"
    //               size="large"
    //               sx={[
    //                 {
    //                   "&:hover": {
    //                     backgroundColor: "#FFE26E",
    //                     borderColor: "#FFE26E",
    //                     borderWidth: "3px",
    //                     color: "black",
    //                   },
    //                   minWidth: 200,
    //                   borderColor: "black",
    //                   backgroundColor: "black",
    //                   color: "#FFE26E",
    //                   borderWidth: "3px",
    //                 },
    //               ]}
    //               onClick={handelAddToCart}
    //             >
    //               ADD TO BAG
    //             </Button>
    //           </div>
    //           <div className="add__wish">
    //             <IconButton
    //               variant="outlined"
    //               size="large"
    //               sx={[
    //                 {
    //                   "&:hover": {
    //                     backgroundColor: "#FFE26E",
    //                     borderColor: "#FFE26E",
    //                     borderWidth: "3px",
    //                     color: "black",
    //                   },
    //                   borderColor: "black",
    //                   backgroundColor: "black",
    //                   color: "#FFE26E",
    //                   borderWidth: "3px",
    //                 },
    //               ]}
    //               onClick={handelAddToWish}
    //             >
    //               <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
    //             </IconButton>
    //           </div>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="product__detail__container">
      <div className="product__detail">
        {/* Product Information */}
        <div className="product__main__detail">
          <div className="product__category">
            <span className="label">Category: </span>
            <span>{item.category}</span>
          </div>
          <h1 className="product__name__main">{item.name}</h1>
          <p className="product__detail__description">{item.description}</p>
          {item.color && (
            <div className="product__color">
              <span className="label">Color:</span>
              <div
                className="product-color"
                style={{ backgroundColor: `${item.color}` }}
              ></div>
            </div>
          )}
          <div className="product__price__detail">
            <span>Price:</span> ${Number(item.price).toFixed(2)}
          </div>
          <div className="product__size">
            {item.size?.length > 1 ? (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Size</InputLabel>
                  <Select value={size} label="Size" onChange={handleSizeChange}>
                    {item.size.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <div className="product__color">
                <span className="label">Size: {item.size[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Actions */}
        <div className="product__actions">
          {/* <div className="product__quantity">
            <IconButton onClick={handelQuantityIncrement}>
              <AddCircleIcon />
            </IconButton>
            <span className="quantity__input">{quantity}</span>
            <IconButton onClick={handelQuantityDecrement}>
              <RemoveCircleIcon />
            </IconButton>
          </div> */}

          <div className="product__buttons">
            <div className="d-flex m-1">
              <Button
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "black",
                  color: "#FFE26E",
                  borderColor: "black",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  width: "50px",
                  "&:hover": {
                    backgroundColor: "#FFE26E",
                    color: "black",
                  },
                }}
                onClick={handelQuantityDecrement}
              >
                -
              </Button>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={quantity}
                style={{ width: "60px", border: "none" }}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "black",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  color: "#FFE26E",
                  borderColor: "black",
                  width: "50px",
                  "&:hover": {
                    backgroundColor: "#FFE26E",
                    color: "black",
                  },
                }}
                onClick={handelQuantityIncrement}
              >
                +
              </Button>
            </div>
            <Button
              variant="outlined"
              size="large"
              sx={{
                backgroundColor: "black",
                color: "#FFE26E",
                borderColor: "black",
                width: "200px",
                "&:hover": {
                  backgroundColor: "#FFE26E",
                  color: "black",
                },
              }}
              onClick={handelAddToCart}
            >
              ADD TO BAG
            </Button>

            <IconButton
              sx={{
                backgroundColor: "black",
                color: "#FFE26E",
                "&:hover": {
                  backgroundColor: "#FFE26E",
                  color: "black",
                },
                width: "50px",
                height: "50px",
              }}
              onClick={handleAddToWishlist}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
