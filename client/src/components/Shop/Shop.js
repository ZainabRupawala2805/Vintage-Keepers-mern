import { useCallback, useEffect, useState } from "react";
import { TabTitle } from "../../utils/General";
import axios from "axios";
import ShopCategory from "./Container/ShopCategory";
import "./Shop.css";
import ReactLoading from "react-loading";
import { BACKEND_URL } from "../../config";
import ItemCard from "../Card/ItemCard/ItemCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";

const Shop = () => {
  TabTitle("Vintage Keepers - Shop");

  // State variables
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({
    textFilter: "",
    category: "",
    tag: "",
    size: "",
    inStock: 0,
    minPrice: 0,
    maxPrice: 1000,
    color: "",
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch items based on filters
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/items/shop`, { params: filter })
      .then((res) => {
        setItems(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, [filter]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout); // Clear the previous timeout
      timeout = setTimeout(() => func(...args), delay); // Set a new timeout
    };
  };

  // Debounced filter update
  const debouncedFilterUpdate = useCallback(
    debounce((updatedFilter) => {
      setFilter((prev) => ({ ...prev, ...updatedFilter }));
    }, 500), // 500ms delay
    []
  );

  // Update filter state
  const updateFilter = (key, value) => {
    debouncedFilterUpdate({ [key]: value, page: 1 });
    // setFilter((prev) => ({ ...prev, [key]: value, page: 1 })); // Reset to page 1 for new filters
  };

  console.log(filter, "filter");
  return (
    <div className="shop__contianer">
      <div className="category__header__container">
        {/* Shop Page Header */}
        <div className="category__header__big">
          <div className="category__header">
            <h2>Shop Page</h2>
          </div>
          <div className="category__header__line"></div>
        </div>
        {/* Filters Section */}
        <div className="shop__filters">
          <Box display="flex" flexWrap="wrap" gap={5}>
            {/* Text Filter */}
            <TextField
              label="Search Products"
              size="small"
              variant="outlined"
              value={filter.textFilter}
              onChange={(e) => updateFilter("textFilter", e.target.value)}
            />

            {/* Price Range Slider */}
            <Box width={300}>
              <Slider
                value={[filter.minPrice, filter.maxPrice]}
                onChange={(e, newValue) => {
                  console.log(newValue, "pricerange");
                  if (filter.minPrice === newValue[0]) {
                    updateFilter("maxPrice", newValue[1]);
                  } else {
                    updateFilter("minPrice", newValue[0]);
                  }
                }}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={5}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 100, label: "$100" },
                  { value: 300, label: "$300" },
                  { value: 500, label: "$500" },
                  { value: 700, label: "$700" },
                  { value: 1000, label: "$1000" },
                  //   { value: 1000, label: "$1000" },
                ]}
              />
            </Box>
            {/* Category Filter */}
            <FormControl
              size="small"
              sx={{
                width: "200px",
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={filter.category}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                {/* <MenuItem value="">All</MenuItem> */}
                <MenuItem value="Arts">Arts</MenuItem>
                <MenuItem value="European">European</MenuItem>
                <MenuItem value="Collectibles">Collectibles</MenuItem>
              </Select>
            </FormControl>

            {/* In Stock Filter */}
            <FormControl
              size="small"
              sx={{
                width: "200px",
              }}
            >
              <InputLabel>In Stock</InputLabel>
              <Select
                value={filter.inStock}
                onChange={(e) => updateFilter("inStock", e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>In Stock</MenuItem>
              </Select>
            </FormControl>

            {/* Color Filter */}
            <TextField
              label="Color"
              size="small"
              variant="outlined"
              value={filter.color}
              onChange={(e) => updateFilter("color", e.target.value)}
            />
          </Box>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="container h-100 w-10 justify-self-center align-self-center m-auto"
        />
      )}

      {/* Product Listing */}
      <div className="shop__category__card__container">
        <div className="shop__category__product__card">
          {items.length > 0 ? (
            items.map((data) => (
              <ItemCard key={data._id} item={data} category={data.category} />
            ))
          ) : (
            <p>No items found for the selected filters.</p>
          )}
        </div>
      </div>

      {/* Load More Button */}
      <div className="show__more__action">
        <Button
          variant="outlined"
          onClick={() => updateFilter("limit", filter.limit + 1)}
          sx={{
            width: "200px",
            height: "50px",
            borderRadius: "20px",
            fontWeight: "700",
            backgroundColor: "#FFE26E",
            borderColor: "#FFE26E",
            color: "black",
            "&:hover": { borderColor: "#FFE26E", backgroundColor: "none" },
          }}
        >
          Show more
        </Button>
      </div>
    </div>
  );
};

export default Shop;
