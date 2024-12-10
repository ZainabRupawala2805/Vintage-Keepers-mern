import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import WishItemsProvider from "../Context/WishItemsProvider";
import SearchProvider from "../Context/SearchProvider";
import ThemeProvider from "../Context/ThemeProvider";
// import Cart from "../components/Card/Cart/Cart";
import Cartlist from "../components/Cart";
import Checkout from "../components/Checkout/Checkout";
import { UserProvider, useUser } from "../Context/UserContext";
import { useEffect } from "react";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <CartItemsProvider>
            <WishItemsProvider>
              <SearchProvider>
                <Header />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/account">
                    <Route path="me" element={<MyAccount />} />
                    <Route path="manage" element={<ManageAccount />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<Login />} />
                  </Route>
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/category">
                    <Route path=":id" element={<CategoryView />} />
                  </Route>
                  <Route path="/product">
                    <Route path="/product/:category">
                      <Route path=":id" element={<ItemView />} />
                    </Route>
                  </Route>
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cartlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/search/*" element={<SearchView />} />
                  <Route path="/*" element={<SearchView />} />
                </Routes>
                <Footer />
                <Routes>
                  <Route path="/admin" element={<Wishlist />} />
                </Routes>
                <ToastContainer />
              </SearchProvider>
            </WishItemsProvider>
          </CartItemsProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
