import { NavLink } from "react-router-dom";
import "./Checkout.css";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartItemsContext } from "../../Context/CartItemsContext";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toastSuccess } from "../Toast/Toast";

const Checkout = () => {
  const { totalAmount } = useContext(CartItemsContext);

  const handleCheckout = async () => {
    if (totalAmount > 0) {
      const config = {
        reason: "checkout",
        amount: totalAmount,
      };
      toastSuccess("payment successful")

      await axios
        .post(`${BACKEND_URL}`, config)
        .then((res) => {
          console.log(res.data);
          window.location.replace(res.data);
        })
        .catch((err) => console.log(err));
    } else {

      // toastSuccess("payment successful")

      return;
    }
  };
  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__header">
          <h2>Your checkout</h2>
        </div>
        <div className="checkout__items__container">
          <div className="checkout__header">
            Total Amount: {Number(totalAmount).toFixed(2)}
          </div>
          <div className="">
            <NavLink to="#">
              <Button variant="outlined" onClick={handleCheckout}> 
                Pay Now
              </Button>
              {/* onClick={handleCheckout} */}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
