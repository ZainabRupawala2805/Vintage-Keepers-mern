import { useState, useEffect } from "react";
import axios from "axios";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";
import ReactLoading from "react-loading";
import { BACKEND_URL } from "../../../config";

const Related = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // Default parameters for the search API
  const filter = {
    textFilter: "", // Query from URL or context
    category: category || "", // Set default category filter if needed
    tag: "",
    size: "",
    inStock: 1, // Default: Show only items in stock
    minPrice: 0,
    maxPrice: 10000, // Default max price
    color: "",
    page: 1, // Default to first page
    limit: 20, // Limit results to 20
    sortBy: "createdAt", // Default sorting (e.g., by creation date)
    sortOrder: "desc", // Default sorting order (descending)
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/items/shop`, {
        params: filter,
      });
      setItems(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>Recommended Products</h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        <div className="related__product__card">
          {loading && items?.length === 0 && (
            <ReactLoading
              type="balls"
              color="#FFE26E"
              height={100}
              width={100}
              className="m-auto"
            />
          )}
          {/* {filter.textFilter == "" && loading && <h2>Please Search Product.</h2>} */}
          {items?.length == 0 && !loading && (
            <h2>No product Found related to {category}.</h2>
          )}
          {items?.length > 0 &&
            items.map((item) => <RelatedCard item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Related;
