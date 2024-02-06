import { createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";


const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
    }, [cartItems]);


    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    const openCart = () => {
        setIsOpen(true);
    };
    const closeCart = () => {
        setIsOpen(false);
    };



    const getItemsQuantity = (id) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };

    const increaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) === undefined) {
                return [...currItems, { id, quantity: 1 }];
            } else {
                return currItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    };

    const decreaseCartQuantity = (id) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((currItems) =>
            currItems.filter((item) => item.id !== id)
        );
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                cartItems,
                getItemsQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartQuantity
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};



// import React, { createContext, useContext, useReducer } from "react";

// const ShoppingCartContext = createContext({});

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case "ADD_TO_CART":
//             return [...state, { id: action.id, quantity: 1 }];
//         case "INCREASE_QUANTITY":
//             return state.map((item) =>
//                 item.id === action.id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//             );
//         case "DECREASE_QUANTITY":
//             return state.map((item) =>
//                 item.id === action.id
//                     ? { ...item, quantity: Math.max(1, item.quantity - 1) }
//                     : item
//             );
//         case "REMOVE_FROM_CART":
//             return state.filter((item) => item.id !== action.id);
//         default:
//             return state;
//     }
// };

// const ShoppingCartProvider = ({ children }) => {
//     const [cartItems, dispatch] = useReducer(cartReducer, []);

//     const getItemsQuantity = (id) => {
//         return cartItems.find((item) => item.id === id)?.quantity || 0;
//     };

//     const increaseCartQuantity = (id) => {
//         dispatch({ type: "INCREASE_QUANTITY", id });
//     };

//     const decreaseCartQuantity = (id) => {
//         dispatch({ type: "DECREASE_QUANTITY", id });
//     };

//     const removeFromCart = (id) => {
//         dispatch({ type: "REMOVE_FROM_CART", id });
//     };

//     return (
//         <ShoppingCartContext.Provider
//             value={{
//                 cartItems,
//                 getItemsQuantity,
//                 increaseCartQuantity,
//                 decreaseCartQuantity,
//                 removeFromCart,
//             }}
//         >
//             {children}
//         </ShoppingCartContext.Provider>
//     );
// };

// export default ShoppingCartProvider;

// export const useShoppingCart = () => {
//     return useContext(ShoppingCartContext);
// };
