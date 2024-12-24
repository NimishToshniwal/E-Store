import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { Context } from "../../../utils/context";
import HeartButton from "./HeartButton";

const Product = ({ id, data }) => {
    const { handleWishlistToggle, isProductInWishlist } = useContext(Context)
    const isLiked = isProductInWishlist(id)
    const navigate = useNavigate();
    return (
        <div
            className="product-card"
        >
            <div className="thumbnail">
                <img
                    src={
                        process.env.REACT_APP_DEV_URL +
                        data.img.data[0].attributes.url
                    }
                    alt=""
                    onClick={() => navigate("/product/" + id)}
                />
                <HeartButton
                    isLiked={isLiked}
                    onClick={() => handleWishlistToggle(id)}
                />
            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
    );
};

export default Product;
