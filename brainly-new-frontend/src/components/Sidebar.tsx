import React, { useState } from "react";
import { Brain, Youtube, Instagram, Twitter, Facebook, File, LogOut } from "lucide-react";
import { Image } from 'lucide-react';

interface SidebarProps {
  setFilter: (type: string) => void;
}
const Sidebar = ({ setFilter}:SidebarProps) => {
  const[activeFilter ,setActiveFilter] =useState('')
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  const sidebarItems = [
    { name: "All", type: "" }, // Show all content
    { name: "YouTube", type: "youtube", icon: <Youtube className="text-white" />, bg: "bg-red-600" },
    { name: "Instagram", type: "instagram", icon: <Instagram className="text-white" />, bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" },
    { name: "Twitter", type: "twitter", icon: <Twitter className="text-white" />, bg: "bg-blue-500" },
    { name: "Images", type: "images", icon: <Image className="text-white" />, bg: "bg-blue-800" },
    { name: "Document", type: "documents", icon: <File className="text-white" />, bg: "bg-yellow-500" },
  ];

  return (
    <div className="h-screen w-72 fixed left-0 top-0 bg-black text-white border-r shadow-lg shadow-gray-800 rounded">
      <div className="ml-6 mt-8">
        <div className="ml-8 flex gap-1">
          <Brain size={36} color="white" strokeWidth={2} />
          <span className="font-bold text-2xl">
            Recall <span className="text-black bg-amber-500 px-0.5 rounded">hub</span>
          </span>
        </div>
      </div>

      {/* ✅ Sidebar Menu */}
      <div className="mt-10 w-full p-2 py-3 space-y-2">
        {sidebarItems.map(({ name, type, icon, bg }) => (
          <div
            key={name}
            className={`ml-8 py-2 px-4 w-5/6 rounded-lg hover:bg-gray-600 transition duration-200 cursor-pointer flex gap-3 font-semibold hover:scale-105
              ${activeFilter ===type? `${bg} text-white scale-105`:'hover:bg-gray-600'}
              
              `}
            
            onClick={() => {
              setFilter(type)
              setActiveFilter(type)
            }} // ✅ Update filter on click
          >
            {icon && <div className={`p-2 rounded ${bg}`}>{icon}</div>}
            {name}
          </div>
        ))}

        {/* ✅ Logout Button */}
        <div className="flex justify-center items-center w-full text-center mt-4">
          <button
            onClick={logout}
            className="bg-red-600 w-full p-1.5 rounded-lg font-bold font-mono text-lg hover:text-xl flex items-center justify-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
