import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { PanelRight, DoorOpen } from 'lucide-react';
import Card from '../components/Card';
import CreateModal from '../components/CreateModal';
import UseContent from '../hooks/UseContent';

interface content {
  _id: string;
  type:any; // Ensure type exists
  title: string;
  link:string,
  
}
const Dashboard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false); 
   const [contents,refresh,deleteContent] =UseContent()
   const [filter, setFilter] =useState<string|undefined>()
  const [isOpen, setIsOpen] = useState(true);
  const toggleBar = () => {
    setIsOpen(!isOpen);
  };



    // filter the content based on the filtered category 
    const filteredContent =filter ? contents.filter(item =>item.type ===filter):contents
  return (
    <>
      <div className="relative flex fixed">
        {/* ✅ Pass modal state correctly */}
        <CreateModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />  

        <button onClick={toggleBar} className="absolute top-2 left-2 z-50 text-white p-0.5 rounded-md hover:border hover:cursor-pointer fixed">
          {isOpen ? <DoorOpen /> : <PanelRight />}
        </button>

        <div className={`duration-300 ease-in-out transition-all ${isOpen ? 'block' : "hidden"}`}>
          <Sidebar setFilter={setFilter}/>
        </div>

        <div className={`flex-grow transition-all duration-300 ease-in-out ${isOpen ? 'ml-[300px]' : 'ml-0'}`}>
          {/* ✅ Pass `setIsOpenModal` to DashboardNavbar */}
          <DashboardNavbar setIsOpenModal={setIsOpenModal} />  
          
          <div className="flex flex-wrap space-x-3 space-y-2 shadow-lg ml-8">
            {filteredContent.map(({_id,link,type,title}:content)=>  <Card key={_id}
             title={title}
              link={link} 
              type={type}
              onDelete={()=>deleteContent(_id)}
             />)}
          
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
