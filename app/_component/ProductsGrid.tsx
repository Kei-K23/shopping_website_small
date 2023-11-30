"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  ShoppingCartItem,
  useShoppingCart,
} from "@/provider/ShoppingCartProvider";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Inspect, Shirt, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsGrid = () => {
  const { toast } = useToast();
  const { state, dispatch } = useShoppingCart();
  const { data: products, status } = useQuery({
    queryKey: ["products", "infinite"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        return Promise.reject(new Error("Could not fetch products"));
      }
      return res.json() as Promise<Product[]>;
    },
  });

  function onClickAddToShoppingCart(item: ShoppingCartItem) {
    dispatch({ type: "ADD_ITEM", payload: item });
    toast({
      description: "Successfully added new item to shopping cart",
    });
  }

  function checkItemAlreadyInShoppingCart(id: number) {
    return state.items.some((item) => item.id === id);
  }

  if (status === "error") {
    return <div>Could not fetch products</div>;
  }

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  my-4 mx-4 md:mx-10 lg:mx-14 xl:mx-12">
      {status === "loading"
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
            <div
              key={s}
              className="bg-background cursor-pointer relative m-auto sm:m-0 w-[320px] sm:w-full h-[420px] sm:max-h-[470px]"
            >
              <Skeleton className="w-full h-1/2" />
              <div className="px-3">
                <Skeleton className="w-[50px] h-1" />
                <Skeleton className="w-full h-32" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-9 rounded-md px-3 w-20" />
                  <Skeleton className="h-9 rounded-md px-3 w-20" />
                </div>
              </div>
            </div>
          ))
        : products.map((product) => (
            <div
              key={product.id}
              className="bg-background cursor-pointer relative m-auto sm:m-0 w-[320px] sm:w-full h-[420px] sm:max-h-[470px] border border-neutral-500"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={50}
                className="w-full h-1/2"
              />
              <Separator className="my-3" />
              <div className="px-3 ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h2 className="line-clamp-2 font-bold">
                        {product.title}
                      </h2>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{product.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="line-clamp-3 my-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <Button
                    disabled={
                      checkItemAlreadyInShoppingCart(product.id) ? true : false
                    }
                    variant={"cart"}
                    onClick={() =>
                      onClickAddToShoppingCart({
                        id: product.id,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        title: product.title,
                      })
                    }
                  >
                    <ShoppingCart />
                    Add to Cart
                  </Button>
                  <Dialog>
                    <DialogTrigger>
                      <Button size={"sm"}>
                        <Inspect /> View Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{product.title}</DialogTitle>
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={100}
                          height={50}
                          className="w-[200px] h-[200px] m-auto"
                        />
                        <DialogDescription className="text-slate-800">
                          {product.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <h3 className="flex items-center">
                          <DollarSign className="w-5 h-5" />
                          {product.price}
                        </h3>
                        <h3 className="flex items-center">
                          <Shirt />
                          {product.category}
                        </h3>
                        <h3 className="flex items-center">
                          <Star /> {product.rating.rate}
                        </h3>
                        <Button
                          disabled={
                            checkItemAlreadyInShoppingCart(product.id)
                              ? true
                              : false
                          }
                          variant={"cart"}
                          className="mt-4"
                          onClick={() =>
                            onClickAddToShoppingCart({
                              id: product.id,
                              image: product.image,
                              price: product.price,
                              quantity: 1,
                              title: product.title,
                            })
                          }
                        >
                          <ShoppingCart />
                          Add to Cart
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Badge className="absolute top-1 left-1 ">
                <DollarSign className="w-5 h-5" />
                <span className="text-base">{product.price}</span>
              </Badge>
            </div>
          ))}
    </div>
  );
};

export default ProductsGrid;
