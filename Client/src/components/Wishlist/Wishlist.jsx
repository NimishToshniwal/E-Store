import { useContext } from "react";
import Products from "../Products/Products";
import { Context } from "../../utils/context";
import "./Wishlist.scss";
const Wishlist = () => {
    const { products, wishlist } = useContext(Context);
    const wishlistIds = Object.keys(wishlist)
        .filter((id) => wishlist[id])
        .map((id) => parseInt(id, 10));
    const filteredProducts = {
        data: products?.data.filter((product) =>
            wishlistIds.includes(product.id)
        )
    };
    return (
        <div className="wishlist-main-content">
            <div className="layout">
                <div className="category-title">
                    Wishlist
                </div>
                <Products innerPage={true} products={filteredProducts} />
            </div>
        </div>
    );
};

export default Wishlist;
