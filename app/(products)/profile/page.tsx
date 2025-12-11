"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const userDetails = useSelector((state: any) => state.userDetails.userDetails);

  const { name, email, isAdmin } = userDetails || {};

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Account Profile
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="rounded-2xl shadow-md border bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-36 w-36 shadow-sm border">
                  <AvatarFallback className="text-4xl font-bold bg-gray-100">
                    {name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <Badge
                  className="px-4 py-1 text-sm rounded-full"
                  variant={isAdmin === "true" ? "default" : "secondary"}
                >
                  {isAdmin === "true" ? "Admin" : "User"}
                </Badge>
              </div>

              {/* Info Section */}
              <div className="flex-1 w-full space-y-6">
                
                {/* Full Name */}
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {name || "Not Available"}
                  </p>
                </div>

                <Separator />

                {/* Email */}
                <div>
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {email || "Not Available"}
                  </p>
                </div>

                <Separator />

                {/* Role */}
                <div>
                  <label className="text-sm text-gray-500">Account Role</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {isAdmin === "true" ? "Administrator" : "Standard User"}
                  </p>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
