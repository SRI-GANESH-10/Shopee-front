"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fethProducts } from "@/app/redux/productsSlice";
import { addProduct, removeProduct } from "@/app/redux/productOperationSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "@/components/shared/ProductCard";

export default function DashBoard() {
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
    dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      <ScrollArea className="h-[calc(100vh-200px)] pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.items?.length > 0 ? (
            products.items.map((item: any) => {
              const isInCart = cart.find((prod: any) => prod.id === item.id);

              return (
                <ProductCard
  key={item.id}
  item={item}
  cartItem={cart.find((prod: any) => prod.id === item.id)}
  isAdmin={userDetails?.isAdmin === "true"}
  onAdd={(product: any) => dispatch(addProduct(product))}
  onIncrease={(product: any) => dispatch(addProduct(product))}
  onDecrease={(id: string) => dispatch(removeProduct(id))}
  onDelete={handleDelete}
/>

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
