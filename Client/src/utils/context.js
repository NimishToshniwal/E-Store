import { useEffect, createContext, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { fetchDataFromApi } from "./api";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [cartCount, setCartCount] = useState(0);
    const [cartSubTotal, setCartSubTotal] = useState(0);

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : {};
    });

    const [wishlistCount, setWishlistCount] = useState(0);

    const location = useLocation();

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));

        let count = 0;
        cartItems?.forEach((item) => (count += item.attributes.quantity));
        setCartCount(count);

        let subTotal = 0;
        cartItems.forEach(
            (item) =>
                (subTotal += item.attributes.price * item.attributes.quantity)
        );
        setCartSubTotal(subTotal);
    }, [cartItems]);

    // Update wishlist data in localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        let count = Object.values(wishlist).filter(value => value).length;
        setWishlistCount(count);

    }, [wishlist]);

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (index !== -1) {
            items[index].attributes.quantity += quantity;
        } else {
            product.attributes.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items);
    };

    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p.id !== product?.id);
        setCartItems(items);
    };

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        } else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    };

    // Add or remove product from wishlist
    const handleWishlistToggle = (productId) => {
        setWishlist((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    // Check if a product is in the wishlist
    const isProductInWishlist = (productId) => {
        return !!wishlist[productId];
    };

    return (
        <Context.Provider
            value={{
                products,
                setProducts,
                categories,
                setCategories,
                cartItems,
                setCartItems,
                handleAddToCart,
                cartCount,
                setCartCount,
                handleRemoveFromCart,
                showCart,
                setShowCart,
                handleCartProductQuantity,
                cartSubTotal,
                setCartSubTotal,
                wishlist,
                handleWishlistToggle,
                isProductInWishlist,
                wishlistCount,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AppContext;
