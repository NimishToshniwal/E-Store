import React, { useEffect, useContext, useCallback } from "react";
import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    const { products, setProducts, categories, setCategories } = useContext(Context);

    const getProducts = useCallback(() => {
        fetchDataFromApi("/api/products?populate=*").then((res) => {
            setProducts(res);
        });
    }, [setProducts])
    const getCategories = useCallback(() => {
        fetchDataFromApi("/api/categories?populate=*").then((res) => {
            setCategories(res);
        });
    }, [setCategories]);

    useEffect(() => {
        getProducts();
        getCategories();
    }, [getCategories, getProducts]);

    return (
        <div>
            <Banner />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
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
