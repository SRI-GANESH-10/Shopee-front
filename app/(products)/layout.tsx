"use client";
import Navbar from "@/components/shared/navbar";
import { type JSX, useEffect } from "react";
import {
  getUserDetailsFromCookie,
  setUserDetails,
} from "../redux/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailsFromCookie());
  }, [dispatch]);

  const user = useSelector((state:any) => state.userDetails.userDetails)

  useEffect(()=>{
    if (user) {
      dispatch(setUserDetails(user));
    }
    console.log(user , "ASD")
  }, [user])


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
