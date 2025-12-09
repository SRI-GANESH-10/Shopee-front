"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fethProducts } from "@/app/redux/productsSlice";
import { addProduct, removeProduct } from "@/app/redux/productOperationSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

export default function DashBoard() {
  const loginDetails = useSelector((state: any) => state.loginDetails);
  const products = useSelector((state: any) => state.productList);
  const userDetails = useSelector(
    (state: any) => state.userDetails.userDetails
  );
  const cart = useSelector((state: any) => state.productOperations);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fethProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    console.log("Delete product:", id);
    // later you can dispatch your delete thunk here
    dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      <ScrollArea className="h-[calc(100vh-20f0px)] pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.items?.length > 0 ? (
            products.items.map((item: any) => {
              const isInCart = cart.find((prod: any) => prod.id === item.id);

              return (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <img
                      src={
                        item.images
                          ? item.images[0]
                          : `https://picsum.photos/id/${item.id}/2400/1400`
                      }
                      alt={item.title}
                      className="h-40 w-full object-contain rounded-t-xl"
                    />
                  </CardHeader>

                  <CardContent className="space-y-3 pt-4">
                    <div>
                      <CardTitle className="text-base truncate">
                        {item.name}
                      </CardTitle>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-green-600">
                        ₹{item.price}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isInCart ? "destructive" : "default"}
                          onClick={() => {
                            if (isInCart) {
                              dispatch(removeProduct(item.id));
                            } else {
                              dispatch(addProduct(item));
                            }
                          }}
                        >
                          {isInCart ? "Remove from Cart" : "Add to Cart"}
                        </Button>
                        {userDetails?.isAdmin === "true" ? (
                          <Button
                            variant={"outline"}
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2></Trash2>
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-muted-foreground">Loading products...</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
