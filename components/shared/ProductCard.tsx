"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({
  item,
  cartItem,
  isAdmin,
  onIncrease,
  onDecrease,
  onAdd,
  onDelete,
}: any) {

  const router = useRouter();
  return (
    <Card className="hover:shadow-lg transition-all rounded-xl border p-2"       onClick={() => router.push(`/dashboard/product/${item.id}`)}>
      <CardHeader className="p-0">
        <div className="h-44 w-full bg-white flex items-center justify-center overflow-hidden rounded-md">
          <img
            src={
              item.images
                ? item.images[0]
                : `https://picsum.photos/id/${item.id}/2400/1400`
            }
            alt={item.title}
            className="h-full object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-4">
        <div>
          <CardTitle className="text-base font-semibold truncate">
            {item.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-green-600 text-sm">
            ₹{item.price}
          </Badge>

          <div className="flex items-center gap-2">
            {cartItem ? (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDecrease(item.id)}
                >
                  -
                </Button>

                <span className="min-w-[24px] text-center font-medium">
                  {cartItem.quantity}
                </span>

                <Button size="sm" variant="outline" onClick={() => onIncrease(item)}>
                  +
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => onAdd(item)}>
                Add to Cart
              </Button>
            )}

            {isAdmin && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 size={18} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
