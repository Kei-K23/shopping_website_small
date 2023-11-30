import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DollarSign,
  Minus,
  Plus,
  ShoppingCartIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useShoppingCart } from "@/provider/ShoppingCartProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const Cart = () => {
  const { state, dispatch } = useShoppingCart();

  const totalQuantity = state.items.length
    ? state.items.reduce((acc, curr) => {
        const quantity = curr.quantity;

        acc += quantity;

        return acc;
      }, 0)
    : 0;
  const totalPrice = parseFloat(
    String(
      state.items.length
        ? state.items.reduce((acc, curr) => {
            const price = curr.price * curr.quantity;

            acc += price;

            return acc;
          }, 0)
        : 0
    )
  ).toFixed(2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <ShoppingCartIcon />
          <Badge className="p-1.5 py-0.5 absolute -top-3">
            {totalQuantity}
          </Badge>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px]  sm:w-[400px]">
        <DropdownMenuLabel className="flex justify-between">
          <h3>Shopping Cart</h3>
          <h3 className="flex items-center">
            <DollarSign className="w-4 h-4" />
            {totalPrice}
          </h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button className="w-full">
            <CheckCircle /> Check out
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {state.items.length ? (
          <ScrollArea className="w-full h-72 sm:h-96">
            {state.items.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex flex-col justify-start items-start border-b border-b-neutral-300 last:border-b-0"
              >
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="w-[80px] h-[60px]"
                  />
                  <h3>{item.title}</h3>
                </div>
                <div className=" flex items-center gap-4">
                  <Button
                    size={"icon"}
                    onClick={() => {
                      dispatch({
                        type: "INCREMENT",
                        payload: item.id,
                      });
                    }}
                  >
                    <Plus />
                  </Button>
                  <Badge>{item.quantity}</Badge>
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => {
                      dispatch({
                        type: "DECREMENT",
                        payload: item.id,
                      });
                    }}
                  >
                    <Minus />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        ) : (
          <DropdownMenuItem>No item yet!</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
