"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { addProduct } from "@/app/redux/productsSlice";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch: any = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "quantity" || e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("quantity", formData.quantity.toString());
    data.append("price", formData.price.toString());
    data.append("description", formData.description);

    formData.images.forEach((file) => {
      data.append("images", file);
    });

    dispatch(addProduct(data));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Add New Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Textarea
              name="description"
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
            />

            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
