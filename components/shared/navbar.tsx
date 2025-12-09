"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <Menu className="h-5 w-5 md:hidden" />
          <h1 className="text-xl font-semibold">My Dashboard</h1>
        </div>

        {/* Right Section - Popover */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
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

                <Button variant="ghost" className="justify-start">
                  Account
                </Button>

                <Button variant="ghost" className="justify-start">
                  Settings
                </Button>

                <Button variant="destructive" className="justify-start">
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
