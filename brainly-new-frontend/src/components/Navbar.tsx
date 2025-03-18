import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import Button from './Button';
import { Moon } from 'lucide-react';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate =useNavigate()

  const onTotheRegister =()=>{
   
    navigate("/signup")
  }
  const ontoLogin =()=>{
    navigate("/signin")
  }

  const [isOpen ,setIsOpen] =useState(false)
  const toggleTheme =()=>{
    setIsOpen(!isOpen)
  }
  return (
    <div className='w-full flex text-white justify-between px-4 items-center pt-2'>
      <div className='relative flex items-center space-x-2'>
        {/* Glowing Logo */}
        <div className="relative p-2 rounded-full bg-transparent 
          shadow-[0_0_15px_#a855f7,0_0_30px_#3b82f6] 
          animate-glow transition-shadow duration-300 
          hover:border-white hover:shadow-[0_0_15px_white,0_0_30px_white]">
          <Brain size={36} color="white" strokeWidth={2} />
        </div>

        {/* Glowing and Shaking Text on Hover */}
        {/* <span className="text-xl font-bold relative px-3 py-1 transition-all duration-300 
          bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent 
          hover:animate-shake hover:text-white hover:drop-shadow-[0_0_8px_white]">
          {Array.from("RecallHub").map((char, i) => (
            <span key={i} className="inline-block hover:animate-glow">
              {char}
            </span>
          ))}
        </span> */}

        <h1  className='font-bold text-3xl'>Recall<span className='text-black bg-yellow-600 px-1 rounded-md'>hub</span></h1>
      </div>

      <div className='md:hidden flex space-x-4'>
      <Button variant='outline'><Moon/></Button>
      <Button variant='outline'onClick={toggleTheme}>{isOpen ? <X/>: <Menu/>}</Button>

      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-[#121212] flex flex-col items-center space-y-4 py-4 shadow-md ">
          <a href="#" className="text-black dark:text-white hover:text-blue-500">Home</a>
          <a href="#" className="text-black dark:text-white hover:text-blue-500">About</a>
          <a href="#" className="text-black dark:text-white hover:text-blue-500">Services</a>
          <a href="#" className="text-black dark:text-white hover:text-blue-500">Contact</a>
        </div>
      )}

      <div className=' space-x-4 hidden md:flex '>
      <Button variant='outline'><Moon/></Button>
       <Button onClick={ontoLogin}variant='primary'>login</Button>
       <Button onClick={onTotheRegister} variant='outline'>register</Button>

      </div>
      
    </div>
  );
};

export default Navbar;
