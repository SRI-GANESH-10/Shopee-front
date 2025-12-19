"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { clearProducts } from "@/app/redux/productOperationSlice";
import { usePlaceOrderMutation } from "@/app/redux/api/orderApi";

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.productOperations);
  const user = useSelector((state: any) => state.userDetails?.userDetails);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    pincode: "",
  });

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const shippingCharge = cart.length > 0 ? 8 : 0;
  const total = subtotal + shippingCharge;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    try {
      await placeOrder({
        items: cart,
        address,
        total,
        paymentMethod: "COD",
      }).unwrap();

      dispatch(clearProducts());
      alert("Order placed successfully!");
    } catch (error) {
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ADDRESS */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={address.name}
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label>Street Address</Label>
                <Input
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Pincode</Label>
                <Input
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* PAYMENT */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="cod" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" />
                  <Label>Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2 opacity-50">
                  <RadioGroupItem value="online" disabled />
                  <Label>Online Payment (Coming Soon)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* SUMMARY */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="truncate">
                  {item.name} × {item.quantity ?? 1}
                </span>
                <span>₹{item.price * (item.quantity ?? 1)}</span>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>₹{shippingCharge}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Button
              className="w-full rounded-full bg-black text-white hover:bg-gray-900"
              disabled={cart.length === 0 || isLoading}
              onClick={handlePlaceOrder}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}