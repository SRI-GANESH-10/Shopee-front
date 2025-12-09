"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie;
    const hasUserDetails = cookies
      .split("; ")
      .some((cookie) => cookie.startsWith("userDetails="));

    if (hasUserDetails) {
      router.push("/dashboard");
    }
  }, [router]);

  return <main>{children}</main>;
};

export default DashboardLayout;
