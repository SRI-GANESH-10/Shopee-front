"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/app/redux/productOperationSlice";
import { fethProducts } from "@/app/redux/productsSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { productId }: any = useParams();
  const dispatch = useDispatch<any>();

  const products = useSelector((state: any) => state.productList.items);

  useEffect(() => {
    dispatch(fethProducts());
  }, [dispatch]);

  const product = products?.find((p: any) => p.id === productId);

  if (!product)
    return <p className="p-4 text-muted-foreground">Loading product...</p>;

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={18}
          fill={i <= rating ? "gold" : "none"}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 max-w-6xl mx-auto">
      {/* LEFT SIDE — PRODUCT IMAGES */}
      <div className="space-y-4">
        {/* Big Image */}
        <div className="border rounded-2xl p-6 bg-white shadow-sm h-[480px] flex items-center justify-center">
          <img
            src={
              product?.images?.[0] ??
              `https://picsum.photos/id/${product.id}/1600/1200`
            }
            alt={product.name}
            className="object-contain max-h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {product?.images?.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              className="h-20 w-20 border rounded-xl p-1 object-cover cursor-pointer hover:ring-2 hover:ring-primary transition"
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — DETAILS */}
      <div className="space-y-6">
        {/* Name */}
        <h1 className="text-3xl font-bold leading-snug">{product.name}</h1>

        {/* Average Rating */}
        <div className="flex items-center gap-3">
          {renderStars(Math.round(product.averageRating || 0))}
          <span className="text-sm text-muted-foreground">
            {product.averageRating?.toFixed(1) || "0.0"} / 5
          </span>
        </div>

        {/* Price */}
        <Badge className="text-xl py-2 px-4 w-fit bg-green-100 text-green-700 rounded-2xl shadow-sm">
          ₹{product.price}
        </Badge>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed">
          {product.description}
        </p>

        {/* Add to Cart */}
        <Button
          className="mt-2 w-full md:w-1/2 py-3 text-lg rounded-xl shadow-md hover:shadow-lg transition"
          onClick={() => dispatch(addProduct(product))}
        >
          Add to Cart
        </Button>

        <Separator className="my-6" />

        {/* Reviews Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>

          {product.reviews?.length === 0 && (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}

          {product.reviews?.map((review: any, idx: number) => (
            <div
              key={idx}
              className="p-4 border rounded-xl bg-gray-50 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.userName || "User"}</p>
                {renderStars(review.rating)}
              </div>

              {review.comment && (
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              )}

              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
