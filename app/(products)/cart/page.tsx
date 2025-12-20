"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct , addProduct} from "@/app/redux/productOperationSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Product } from "@/app/redux/productsSlice";

export default function CartPage() {
  const cart = useSelector((state: any) => state.productOperations);
  const dispatch = useDispatch();
  const userDetails = useSelector((state:any)=> state.userDetails.userDetails);

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const shippingCharge = 8.0;
  const total = subtotal + shippingCharge;

  const router = useRouter();


  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Free Shipping Header */}
      <div className="bg-orange-50 border border-orange-200 p-4 rounded text-sm mb-6">
        <p className="font-semibold text-orange-700">
          Free Shipping for Members.
        </p>
        <span className="text-gray-600">
          Become a Member for fast and free shipping.{" "}
          <button className="underline">Join us</button> or{" "}
          <button className="underline">Sign in</button>
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 max-h-96 overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-semibold mb-6">Bag</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your bag is empty.</p>
          ) : (
            cart.map((item: Product) => (
              <div key={item._id} className="flex gap-5 border-b pb-6 mb-6">
                {/* Product Image */}
                <img
                  src={
                    item?.images?.[0] ??
                    `https://res.cloudinary.com/dqk3pzhan/image/upload/v1766135284/Shopee_product_default_ihlots.png`
                  }
                  alt={item.name}
                  className="w-32 h-32 object-contain rounded"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>

                  <div className="text-sm text-gray-600 mt-1">
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-sm text-gray-600">Quantity:</span>

                      <div className="flex items-center border rounded-lg overflow-hidden">
                        {/* Decrease Quantity */}
                        <button
                          onClick={() => dispatch(removeProduct(item._id))}
                          className="px-3 py-1 text-lg font-semibold hover:bg-gray-100"
                        >
                          -
                        </button>

                        {/* Current Quantity */}
                        <span className="px-4 py-1 text-base font-medium bg-gray-50">
                          {item.quantity ?? 1}
                        </span>

                        {/* Increase Quantity */}
                        <button
                          onClick={() => dispatch(addProduct(item))}
                          className="px-3 py-1 text-lg font-semibold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-4 text-sm mt-3">
                    <button className="underline text-gray-600">
                      Move to Favorites
                    </button>
                    <button
                      className="underline text-gray-600"
                      onClick={() => dispatch(removeProduct(item._id))}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Shipping Info */}
                  <div className="text-sm text-gray-600 mt-4">
                    <p>
                      Shipping:
                      <span className="text-gray-800 ml-1">
                        Arrives Tue, Jan 20 – Thu, Jan 22
                      </span>{" "}
                      <button className="underline">Edit Location</button>
                    </p>

                    <p className="mt-1">
                      Pickup:{" "}
                      <button className="underline">Find a Store</button>
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="font-semibold text-lg">₹{item.price}</p>
              </div>
            ))
          )}
        </div>

        {/* Right Section - Summary */}
        <Card className="w-full lg:w-80 p-6 h-fit border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>

          {/* Subtotal */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Estimated Shipping & Handling</span>
            <span>₹{shippingCharge}</span>
          </div>

          {/* Tax */}
          <div className="flex justify-between text-sm pb-3 border-b">
            <span className="text-gray-600 flex items-center">
              Estimated Tax
            </span>
            <span>—</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold mt-4 mb-6">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <Button className="w-full h-12 text-base rounded-full mb-3 bg-black text-white hover:bg-gray-900" onClick={()=>{
            router.push('/checkout')
          }}>
            Checkout
          </Button>
        </Card>
      </div>
    </div>
  );
}
