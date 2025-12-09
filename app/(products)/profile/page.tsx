'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Profile() {
  const userDetails = useSelector((state: any) => state.userDetails.userDetails)

  const {
    name,
    email,
    isAdmin,
    _id
  } = userDetails || {}

  return (
    <div className="h-[calc(100vh-180px)] bg-gray-50 px-6 py-10">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your personal information</p>
      </div>

      <Separator className="my-6 max-w-5xl mx-auto" />

      {/* Profile Info Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Left: Avatar */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-32 w-32">
            <AvatarFallback className="text-3xl font-bold">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Badge className="text-sm px-4 py-1" variant={isAdmin === "true" ? "default" : "secondary"}>
            {isAdmin === "true" ? "Admin" : "User"}
          </Badge>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <div className="text-lg font-medium text-gray-800 mt-1">
              {name || 'Not Available'}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <div className="text-lg font-medium text-gray-800 mt-1">
              {email || 'Not Available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
