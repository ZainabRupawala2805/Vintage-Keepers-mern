import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ItemCard from "../../Card/ItemCard/ItemCard";
import ReactLoading from "react-loading";
import "./FeaturedItems.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { Button } from '@mui/material';

const FeaturedItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState({
    pageSize: 10,
  });

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/items/shop?textFilter&category=&tag&size&InStock=0&minPrice=0&MaxPrice=10000&color&page=1&limit=${filter.pageSize}&sortBy=createdAt&sortOrder=desc`
      )
      .then((res) => {
        console.log(res, "items shop data");
        setItems(res.data.data);
      })
      .catch((err) => console.log(err));

    // window.scrollTo(0, 0)
  }, [filter]);

  return (
    <div className="featured__products__container mb-3">
      <div className="featured__products">
        <div className="featured__products__header">
          <h3 className="featured__items__header__big">Featured Items </h3>
          <Link to="/shop" className="featured__header__small">
            Show all
            <ArrowRightAltIcon />
          </Link>
        </div>
        <div className="featured__products__header__line"></div>
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
          {!items && (
            <ReactLoading
              type="balls"
              color="#FFE26E"
              height={100}
              width={100}
              className="m-auto"
            />
          )}
          {items && (
            <div className="featured__products__card__container">
              {items?.map((item, index) => {
                return <ItemCard item={item} key={index} />;
              })}
            </div>
          )}
        </div>

        <div className="show__more__action">
          <Button
            variant="outlined"
            onClick={() =>
              setFilter((prev) => {
                return { ...prev, pageSize: filter.pageSize + 10 };
              })
            }
            sx={[
              {
                width: "200px",
                height: "50px",
                borderRadius: "20px",
                fontWeight: "700",
                backgroundColor: "#FFE26E",
                borderColor: "#FFE26E",
                color: "black",
              },
              {
                "&:hover": { borderColor: "#FFE26E", backgroundColor: "none" },
              },
            ]}
          >
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItems;
