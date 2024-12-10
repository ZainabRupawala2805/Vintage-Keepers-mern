import { createContext } from "react";

export const ThemeContext = createContext({
  headerNavbarLinks: [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Arts", path: "/category/Arts" },
    { label: "Collectibles", path: "/category/Collectibles" },
    { label: "European", path: "/category/European" },
  ],
});
