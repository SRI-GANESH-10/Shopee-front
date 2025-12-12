"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fethProducts } from "@/app/redux/productsSlice";
import { addProduct, removeProduct } from "@/app/redux/productOperationSlice";

import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "@/components/shared/ProductCard";
import ProductDetailsDialog from "@/components/shared/ProductDialog";

export default function DashBoard() {
  const products = useSelector((state: any) => state.productList);
  const userDetails = useSelector(
    (state: any) => state.userDetails.userDetails
  );
  const cart = useSelector((state: any) => state.productOperations);
  const dispatch: any = useDispatch();

  // Dialog state
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    dispatch(fethProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => dispatch(deleteProduct(id));

  const handleCardClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
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
                  cartItem={isInCart}
                  isAdmin={userDetails?.isAdmin === "true"}
                  onAdd={(p: any) => dispatch(addProduct(p))}
                  onIncrease={(p: any) => dispatch(addProduct(p))}
                  onDecrease={(id: string) => dispatch(removeProduct(id))}
                  onDelete={handleDelete}
                  onCardClick={handleCardClick}
                />
              );
            })
          ) : (
            <p className="text-muted-foreground">Loading products...</p>
          )}
        </div>
      </ScrollArea>

      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        product={selectedProduct}
        onAddToCart={(product: any) => dispatch(addProduct(product))}
      />
    </div>
  );
}
