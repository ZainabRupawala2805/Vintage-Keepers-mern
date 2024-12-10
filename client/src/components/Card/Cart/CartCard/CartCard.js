import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./CartCard.css";
import { CartItemsContext } from "../../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, TextField } from "@mui/material";

const CartCard = (props) => {
  let cartItems = useContext(CartItemsContext);
  const [size, setSize] = useState(props.item.size[0]);

  const handelQuantityIncrement = (event) => {
    cartItems.quantity(props.item._id, "INC");
  };

  const handelQuantityDecrement = (event) => {
    if (props.item.itemQuantity > 1) {
      cartItems.quantity(props.item._id, "DEC");
    }
  };

  const handelRemoveItem = () => {
    cartItems.removeItem(props.item);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQtyChange = (itemData, value) => {
    cartItems.updateQty(itemData, value);
  };

  return (
    <div className="cart__item__card">
      <div className="cart__item__image">
        <img src={props.item.image[0]} alt="item" className="item__image" />
      </div>
      <div className="cart__item__detail">
        <div className="cart__item__name">{props.item.name}</div>
      </div>
      {/* cart__item__quantity */}
      <div className="">
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
            value={props.item.itemQuantity}
            style={{ width: "60px", border: "none" }}
            onChange={(e) => handleQtyChange(props.item, e.target.value)}
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

        {/* <IconButton onClick={handelQuantityDecrement}>
          <RemoveCircleIcon fontSize="medium" />
        </IconButton>
        <div type="text" name="quantity" className="quantity__input">
          {props.item.itemQuantity}
        </div>
        <IconButton onClick={handelQuantityIncrement}>
          <AddCircleIcon />
        </IconButton> */}
      </div>
      {/* <div className="product size">
                <Box sx={{ minWidth: 80} }>
                    <FormControl fullWidth size="small">
                        <InputLabel>Size</InputLabel>
                        <Select
                        value={size}
                        label="size"
                        onChange={handleSizeChange}
                        >
                        {props.item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box>
            </div> */}
      <div className="cart__item__price">${props.item.price}</div>
      <div className="cart__item__price">
        $
        {Number(
          Number(props.item.price) * Number(props.item.itemQuantity)
        ).toFixed(2)}
      </div>
      <div className="remove__item__icon">
        <IconButton>
          <HighlightOffIcon onClick={handelRemoveItem} />
        </IconButton>
      </div>
    </div>
  );
};

export default CartCard;


// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useContext, useState } from "react";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import "./CartCard.css";
// import { CartItemsContext } from "../../../../Context/CartItemsContext";
// import { IconButton } from "@mui/material";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { Button, TextField } from "@mui/material";

// const CartCard = ({item}) => {
//   let cartItems = useContext(CartItemsContext);
//   const [size, setSize] = useState(item.size[0]);

//   const handelQuantityIncrement = (event) => {
//     cartItems.quantity(item._id, "INC");
//   };

//   const handelQuantityDecrement = (event) => {
//     if (item.itemQuantity > 1) {
//       cartItems.quantity(item._id, "DEC");
//     }
//   };

//   const handelRemoveItem = () => {
//     cartItems.removeItem(item);
//   };

//   const handleSizeChange = (event) => {
//     setSize(event.target.value);
//   };

//   const handleQtyChange = (itemData, value) => {
//     cartItems.updateQty(itemData, value);
//   };

//   return (
//     <div className="cart__item__card">
//       <div className="cart__item__image">
//         <img src={item.image[0]} alt="item" className="item__image" />
//       </div>
//       <div className="cart__item__detail">
//         <div className="cart__item__name">{item.name}</div>
//       </div>
//       {/* cart__item__quantity */}
//       <div className="">
//         <div className="d-flex m-1">
//           <Button
//             variant="outlined"
//             size="small"
//             sx={{
//               backgroundColor: "black",
//               color: "#FFE26E",
//               borderColor: "black",
//               borderTopRightRadius: "0px",
//               borderBottomRightRadius: "0px",
//               width: "50px",
//               "&:hover": {
//                 backgroundColor: "#FFE26E",
//                 color: "black",
//               },
//             }}
//             onClick={handelQuantityDecrement}
//           >
//             -
//           </Button>
//           <TextField
//             id="outlined-basic"
//             variant="outlined"
//             value={item.itemQuantity}
//             style={{ width: "60px", border: "none" }}
//             onChange={(e) => handleQtyChange(item, e.target.value)}
//           />
//           <Button
//             variant="outlined"
//             size="small"
//             sx={{
//               backgroundColor: "black",
//               borderTopLeftRadius: "0px",
//               borderBottomLeftRadius: "0px",
//               color: "#FFE26E",
//               borderColor: "black",
//               width: "50px",
//               "&:hover": {
//                 backgroundColor: "#FFE26E",
//                 color: "black",
//               },
//             }}
//             onClick={handelQuantityIncrement}
//           >
//             +
//           </Button>
//         </div>

//         {/* <IconButton onClick={handelQuantityDecrement}>
//           <RemoveCircleIcon fontSize="medium" />
//         </IconButton>
//         <div type="text" name="quantity" className="quantity__input">
//           {item.itemQuantity}
//         </div>
//         <IconButton onClick={handelQuantityIncrement}>
//           <AddCircleIcon />
//         </IconButton> */}
//       </div>
//       {/* <div className="product size">
//                 <Box sx={{ minWidth: 80} }>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Size</InputLabel>
//                         <Select
//                         value={size}
//                         label="size"
//                         onChange={handleSizeChange}
//                         >
//                         {item.size.map((size) => <MenuItem value={size}>{size}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                 </Box>
//             </div> */}
//       <div className="cart__item__price">${item.price}</div>
//       <div className="cart__item__price">
//         $
//         {Number(
//           Number(item.price) * Number(item.itemQuantity)
//         ).toFixed(2)}
//       </div>
//       <div className="remove__item__icon">
//         <IconButton>
//           <HighlightOffIcon onClick={handelRemoveItem} />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default CartCard;
