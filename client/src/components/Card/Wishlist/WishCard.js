import { useContext } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import './WishCard.css'
import { Button } from '@mui/material';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { toastSuccess } from '../../Toast/Toast';

const WishCard = (props) => {

    const wishItems = useContext(WishItemsContext)

    const handelRemoveItem = () => {
        wishItems.removeItem(props.item)
    }

    const handelAddToCart = () => {
        toastSuccess("Added to Cart!")
        wishItems.addToCart(props.item)
    };

    return ( 
        <div className="wishcard">
             <div className="wish__remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem}/>
                </IconButton>
            </div>
            <div className="wish__item__image">
                {/* <img src={`https://shema-ecommerce.herokuapp.com/${props.item.category}/${props.item.image[0].filename}`} alt="item" className="wish__image"/> */}
                <img src={props.item.image[0]} alt="item" className="wish__image"/>
            </div>
            <div className="wish__item__name">{props.item.name}</div>
            <div className="wish__item__price">${props.item.price}</div>
            <div className="add__to__cart">
                <Button variant='outlined' onClick={handelAddToCart} sx={[{'&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black'}, borderColor: 'black', backgroundColor: "black" , color: "#FFE26E"}]}>Add to cart</Button>
            </div>
        </div>
     );
}
 
export default WishCard;



// import { useContext } from "react";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { IconButton } from "@mui/material";
// import "./WishCard.css";
// import { Button } from "@mui/material";
// // import { WishItemsContext } from "../../../Context/WishItemsContext";
// import { useUser } from "../../../Context/UserContext";
// import { toastSuccess } from "../../Toast/Toast";
// import { useEffect } from "react";

// const WishCard = ({item}) => {
//   //   const wishItems = useContext(WishItemsContext);

//   const { addToCart } = useUser();

//   const handelRemoveItem = () => {
//     // wishItems.removeItem(item);
//   };

//   // const handelAddToCart = () => {
//   //     wishItems.addToCart(item)
//   // };

//   console.log(item, "wishlistData")
//   const handelAddToCart = async () => {
//     await addToCart(item?._id);
//     toastSuccess("Product added to cart!");
//   };


//   return (
//     <div className="wishcard">
//       <div className="wish__remove__item__icon">
//         <IconButton>
//           <HighlightOffIcon onClick={handelRemoveItem} />
//         </IconButton>
//       </div>
//       <div className="wish__item__image">
//         {/* <img src={`https://shema-ecommerce.herokuapp.com/${item.category}/${item.image[0].filename}`} alt="item" className="wish__image"/> */}
//         <img src={item.image[0]} alt="item" className="wish__image" />
//       </div>
//       <div className="wish__item__name">{item.name}</div>
//       <div className="wish__item__price">${item.price}</div>
//       <div className="add__to__cart">
//         <Button
//           variant="outlined"
//           onClick={handelAddToCart}
//           sx={[
//             {
//               "&:hover": {
//                 backgroundColor: "#FFE26E",
//                 borderColor: "#FFE26E",
//                 color: "black",
//               },
//               borderColor: "black",
//               backgroundColor: "black",
//               color: "#FFE26E",
//             },
//           ]}
//         >
//           Add to cart
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default WishCard;
