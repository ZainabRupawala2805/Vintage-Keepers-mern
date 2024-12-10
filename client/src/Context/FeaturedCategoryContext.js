import { createContext } from "react";

import Arts from "../asset/Products/cloth/men/men-1.jpeg";
import Collectibles from "../asset/Products/cloth/women/women-1.jpeg";
import European from "../asset/Products/cloth/kids/kids-2.jpeg";

export const FeatureCategoryContext = createContext([
  {
    name: "Arts",
    image: Arts,
    url: "/category/Arts",
    id: 1,
  },
  {
    name: "Collectibles",
    image: Collectibles,
    url: "/category/Collectibles",
    id: 2,
  },
  {
    name: "European",
    image: European,
    url: "/category/European",
    id: 3,
  },
]);
