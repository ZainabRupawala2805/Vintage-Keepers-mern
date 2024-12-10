import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Category from "../components/Category/Category";
import { BACKEND_URL } from "../config";

const CategoryView = () => {
  const param = useParams();
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);

  // Default parameters for the search API
  const filter = {
    textFilter: "", // Query from URL or context
    category: param.id || "", // Set default category filter if needed
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

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/items/shop`, {
        params: filter,
      })
      .then((res) => {
        setItems(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [param.id]);

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
       {loading && filter.category !== "" && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      )}
      {filter.category == "" && loading && <h2>Please Search Product.</h2>}
      {items?.length == 0 && !loading && <h2>No product Found related to {filter.category}.</h2>}
      {items?.length > 0 && (
        <Category
          name={`Category - ${filter.category}`}
          items={items}
        />
      )}
    </div>
  );
};

export default CategoryView;
