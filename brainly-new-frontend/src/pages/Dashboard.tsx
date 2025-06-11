import React, { useState } from "react";
import { Brain, Youtube, Instagram, Twitter, File, LogOut, Image } from "lucide-react";

interface SidebarProps {
  setFilter: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = useState("");

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }

  const sidebarItems = [
    { name: "All", type: "" },
    { name: "YouTube", type: "youtube", icon: <Youtube className="text-white" />, bg: "bg-red-600" },
    { name: "Instagram", type: "instagram", icon: <Instagram className="text-white" />, bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600" },
    { name: "Twitter", type: "twitter", icon: <Twitter className="text-white" />, bg: "bg-blue-500" },
    { name: "Images", type: "images", icon: <Image className="text-white" />, bg: "bg-blue-800" },
    { name: "Document", type: "documents", icon: <File className="text-white" />, bg: "bg-yellow-500" },
  ];

  return (
    <div className="h-screen w-72 fixed left-0 top-0 bg-black text-white border-r shadow-lg">
      <div className="ml-8 mt-8 flex gap-1 items-center">
        <Brain size={36} />
        <span className="font-bold text-2xl">
          Recall <span className="text-black bg-amber-500 px-1 rounded">hub</span>
        </span>
      </div>

      <div className="mt-10 p-2 space-y-2">
        {sidebarItems.map(({ name, type, icon, bg }) => (
          <div
            key={name}
            onClick={() => {
              setFilter(type);
              setActiveFilter(type);
            }}
            className={`ml-8 py-2 px-4 w-5/6 rounded-lg cursor-pointer flex gap-3 font-semibold transition hover:scale-105
              ${activeFilter === type ? `${bg} text-white` : 'hover:bg-gray-600'}
            `}
          >
            {icon && <div className={`p-2 rounded ${bg}`}>{icon}</div>}
            {name}
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={logout}
            className="bg-red-600 w-full p-2 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
