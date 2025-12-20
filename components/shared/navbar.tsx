"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const loginDetails = useSelector((state: any) => state.loginDetails);
  const cart = useSelector((state: any) => state.productOperations);
  const userDetails = useSelector(
    (state: any) => state.userDetails.userDetails
  );

  const getInitials = (name: string) => {
    if (!name) return "U";
    const split = name.split(" ");
    if (split.length === 1) return split[0][0];
    return split[0][0] + split[1][0];
  };

  const router = useRouter();
  return (
    <nav className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2" onClick={()=>{router.push('/dashboard')}}>
          <Menu className="h-5 w-5 md:hidden" />
          <Image
            src="/Shopee_logo1.png"
            alt="Login"
            className="h-12 w-18"
            priority
            width={100}
            height={100}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="relative"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cart.length}
              </span>
            )}
          </Button>

          {userDetails?.isAdmin === "true" ? (
            <Button onClick={() => router.push("/dashboard/addproduct")}>
              Add Products
            </Button>
          ) : (
            <></>
          )}

          {/* Profile Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Avatar>
                  {loginDetails.name ? (
                    <AvatarFallback>
                      {getInitials(loginDetails.name)}
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback>U</AvatarFallback>
                  )}
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-60">
              <div className="grid gap-3">
                <div>
                  <h4 className="text-sm font-medium">User Settings</h4>
                  <p className="text-xs text-muted-foreground">
                    Manage your profile.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => router.push("/profile")}
                >
                  Account
                </Button>

                <Button variant="ghost" className="justify-start">
                  Settings
                </Button>

                <Button
                  variant="destructive"
                  className="justify-start"
                  onClick={() => router.push("/login")}
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
