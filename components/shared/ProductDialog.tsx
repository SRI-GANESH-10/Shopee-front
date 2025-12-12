"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProductDetailsDialog({
  open,
  setOpen,
  product,
  onAddToCart,
}: any) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        {/* IMAGE */}
        <img
          src={
            product?.images?.[0] ??
            `https://picsum.photos/id/${product?.id}/1200/800`
          }
          alt={product?.name}
          className="w-full h-60 object-contain rounded-md"
        />

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground mt-3">
          {product?.description}
        </p>

        {/* PRICE */}
        <Badge variant="outline" className="text-green-600 mt-2 text-sm">
          ₹{product?.price}
        </Badge>

        {/* Add to Cart */}
        <Button
          className="w-full mt-4"
          onClick={() => {
            onAddToCart(product);
            setOpen(false);
          }}
        >
          Add to Cart
        </Button>

        {/* FUTURE ARREA FOR REVIEWS & RATINGS */}
        <div className="mt-6 space-y-3 border-t pt-4">
          <h3 className="text-lg font-semibold">Reviews & Ratings</h3>
          <p className="text-sm text-muted-foreground">
            Coming soon... ⭐⭐⭐⭐⭐ 
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
