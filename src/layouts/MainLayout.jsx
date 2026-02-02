import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-neutral overflow-hidden">
      <Navbar />
      <main className="grow container mx-auto px-4 py-8">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;