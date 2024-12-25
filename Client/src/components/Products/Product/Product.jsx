import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { Context } from "../../../utils/context";
import HeartButton from "./HeartButton";
import { AiOutlineShopping } from "react-icons/ai";
import { toast } from 'react-toastify';
const Product = ({ id, data }) => {
    const { handleWishlistToggle, isProductInWishlist, handleAddToCart} = useContext(Context)
    const isLiked = isProductInWishlist(id)
    const navigate = useNavigate();
    const productData = {id:id,attributes:data}
    const [clicked, setClicked] = useState(false);
    const handleCartClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300); // Reset animation after 300ms
        handleAddToCart({ id, attributes: data }, 1);
        toast.success('Item added to bag.')
    };
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
                <AiOutlineShopping className={`add-to-cart-icon ${clicked ? "clicked" : ""}`}
                    onClick={handleCartClick}
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
