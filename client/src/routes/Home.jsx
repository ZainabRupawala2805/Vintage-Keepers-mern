import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import { BACKEND_URL } from "../config";


const Home = () => {
    TabTitle("Home - Ecommerce");

    return ( 
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems />
        </Fragment>
    );
}
 
export default Home;