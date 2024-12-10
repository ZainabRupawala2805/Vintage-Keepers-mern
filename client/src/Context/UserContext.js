import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../components/Toast/Toast";

// Create UserContext
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

// Provider Component

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // To store user data
  const [isLoading, setIsLoading] = useState(true); // To manage loading state

  const navigate = useNavigate();

  // Fetch token from localStorage
  const getToken = () => localStorage.getItem("token");

  // Fetch user data and set it to context
  const fetchUserData = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/users/detail`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // for user data getting error.
      //   setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Add product to cart
  const addToCart = async (productId) => {
    const token = getToken();
    if (!token || !user) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/cart`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update cart in user context
      setUser((prev) => ({
        ...prev,
        cart: response.data.cart,
      }));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    const token = getToken();
    if (!token || !user) return;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/wishlist`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update wishlist in user context
      setUser((prev) => ({
        ...prev,
        wishlist: response.data.wishlist,
      }));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Update user profile
  const updateProfile = async (updatedProfile) => {
    const token = getToken();
    if (!token || !user) return;

    try {
      const response = await axios.put(
        `${BACKEND_URL}/users/profile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update profile in user context
      setUser((prev) => ({
        ...prev,
        profile: response.data.profile,
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const cartandWishProductList = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BACKEND_URL}/users/getcartlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser((prev) => ({
        ...prev,
        wishlist: response.data.wishlist,
        cart: response.data.cart,
      }));
    } catch (error) {
      console.error("Error fetching cart and wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toastSuccess("logout Successfully!");
    navigate("/"); // Redirect to home page
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(user, "userLoginData");
  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        fetchUserData,
        addToCart,
        addToWishlist,
        updateProfile,
        logout,
        cartandWishProductList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
