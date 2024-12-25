import React, { useContext } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { Context } from "../../utils/context";
import Features from "../Features/Features";
const Home = () => {
    const { products, categories } = useContext(Context);

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Features/>
                    <Products
                        headingText="Popular Products"
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
