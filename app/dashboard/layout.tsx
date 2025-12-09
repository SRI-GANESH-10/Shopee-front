import Navbar from "@/components/shared/navbar";
import { JSX } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
