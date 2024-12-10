import { useContext } from "react";
import "./index.css";
import { CartItemsContext } from "../../Context/CartItemsContext";
import CartCard from "../Card/Cart/CartCard/CartCard";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const Cartlist = () => {
  const cartItem = useContext(CartItemsContext);
  console.log(cartItem, "cartItem");

  return (
    <div className="cartlist">
      <div className="cartlist__container">
        <div className="cartlist__header">
          <h2>Your Cartlist</h2>
        </div>
        <div className="cartlist__items__container">
          <div className="cartlist__items">
            {cartItem.items.length > 0 ? (
              cartItem.items.map((item) => (
                <CartCard key={item._id} item={item} />
              ))
            ) : (
              <>No items</>
            )}
          </div>
          <hr/>
          {cartItem.items.length > 0 && (
            <div className="cartlist__options">
              <div className="cartlist__total__amount">
                <div className="cartlist__total__amount__label">Total Amount:</div>
                <div className="cartlist__total__amount__value">
                  ${Number(cartItem.totalAmount).toFixed(2)}
                </div>
              </div>
              <div className="">
                <NavLink to="/checkout">
                  <Button variant="outlined">Checkout</Button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cartlist;
