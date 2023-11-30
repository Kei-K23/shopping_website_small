"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

export interface ShoppingCartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

type ShoppingCartState = {
  items: ShoppingCartItem[];
};

type Action =
  | { type: "ADD_ITEM"; payload: ShoppingCartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number };

const initialState: ShoppingCartState = {
  items: [],
};

const ShoppingCartContext = createContext<{
  state: ShoppingCartState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (
  state: ShoppingCartState,
  action: Action
): ShoppingCartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, action.payload],
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT":
      return {
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };

    case "DECREMENT":
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      const removeQuantityZeroItem = updatedItems.filter(
        (item) => item.quantity > 0
      );

      return {
        items: [...removeQuantityZeroItem],
      };

    default:
      return state;
  }
};

export const ShoppingCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const localStorageKey = "shoppingCartState";

  const savedState = localStorage.getItem(localStorageKey);
  const [state, dispatch] = useReducer(
    reducer,
    savedState ? JSON.parse(savedState) : initialState
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart context must be use inside ShoppingCartProvider"
    );
  }
  return context;
};
