import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { PanelRight } from 'lucide-react';
import Card from '../components/Card';
import { DoorOpen } from 'lucide-react';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className='relative flex'>
        {/* Button to toggle sidebar */}
        <button
          onClick={toggleBar}
          className="absolute top-2 left-2 z-50 text-white p-0.5 rounded-md hover:border hover:cursor-pointer"
        >
          {isOpen ? <DoorOpen /> : <PanelRight />}
        </button>

        {/* Sidebar */}
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div
          className={`flex-grow transition-all duration-300 ease-in-out ${isOpen ? 'ml-[300px]' : 'ml-0'}`}
        >
          <DashboardNavbar />
          <Card />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
