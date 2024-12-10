import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../Context/SearchContext";
import "./index.css";
import { BACKEND_URL } from "../../config";
import ReactLoading from "react-loading";
import Category from "../Category/Category";

const Search = () => {
  // Get the search query from the URL (query parameter)
  const search = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // State for loading and search results
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // Get the search query either from URL or context
  const searchQuery = searchParams.get("query") || search.searchQuery;

  // Default parameters for the search API
  const filter = {
    textFilter: searchQuery || "", // Query from URL or context
    category: "", // Set default category filter if needed
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

  // Fetch items based on the current search query
  useEffect(() => {
    if (searchQuery) {
      search.setSearchQuery(searchQuery || ""); // Update the context search query
    }

    const fetchData = async () => {
      setLoading(true);
      if (filter?.textFilter) {
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
      }
    };

    fetchData();
  }, [searchQuery, search]); // Trigger API call when the search query or context changes

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {loading && filter.textFilter !== "" && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      )}
      {filter.textFilter == "" && loading && <h2>Please Search Product.</h2>}
      {items?.length == 0 && !loading && <h2>No product Found related to {searchQuery}.</h2>}
      {items?.length > 0 && (
        <Category
          name={`Search Result - ${searchQuery}`}
          items={items}
          category="Search Result"
        />
      )}
    </div>
  );
};

export default Search;
