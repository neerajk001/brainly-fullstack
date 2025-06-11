import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaBrain } from 'react-icons/fa'; // Brain icon from React Icons
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate =useNavigate()
  const getAnotherPage =()=>{
    navigate("/signup")
  }
  const textPart1 = "A smarter way to remember"; 
  const textPart2 = "your digital brain always online"; 
  const typingSpeed = 0.1; 

  
  const typingVariantsPart1 = {
    initial: { width: 0, opacity: 1 },
    animate: { 
      width: "100%", 
      transition: {
        duration: textPart1.length * typingSpeed, 
        ease: [0.42, 0, 0.58, 1], 
      }
    },
  };

  const buttonVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: 1, // Delay before animation starts
        duration: 0.5, // Animation duration
        ease: "easeInOut", // Smooth easing
      } 
    },
    hover: { 
      scale: 1.05, // Slightly scale up on hover
      transition: { 
        duration: 0.2, // Hover animation duration
        ease: "easeInOut", // Smooth easing
      } 
    },
  };

  const typingVariantsPart2 = {
    initial: { width: 0, opacity: 1 },
    animate: { 
      width: "100%", 
      transition: {
        duration: textPart2.length * typingSpeed, // Duration for the second part
        ease: [0.42, 0, 0.58, 1], // Proper CSS ease-in-out cubic-bezier
        repeat: Infinity, // Loop the animation infinitely
        repeatType: "reverse", // Reverse the animation to create a continuous typing effect
        repeatDelay: 1, // Add a delay before restarting the loop
      }
    },
  };

  
  const floatingVariants = {
    float: {
      y: [-10, 10], 
      rotate: [-5, 5], 
      transition: {
        duration: 3, 
        repeat: Infinity, 
        repeatType: "reverse", 
        ease: "easeInOut", 
      },
    },
  };

  
  const generateRandomPosition = () => {
    return {
      top: `${Math.random() * 100}vh`, 
      left: `${Math.random() * 100}vw`, 
    };
  };

  
  const brainIcons = Array.from({ length: 20 }).map((_, index) => {
    const position = generateRandomPosition();
    return (
      <motion.div
        key={index}
        className="absolute text-4xl opacity-30"
        style={{ ...position, color: '#3b82f6' }}
        variants={floatingVariants}
        animate="float"
      >
        <FaBrain />
      </motion.div>
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar />
      </div>

      {/* Container for Brain Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {brainIcons}
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Main Text with Typing Effect */}
        <div className="text-white flex justify-center items-center mt-24 font-mono text-2xl md:text-4xl text-center">
          <motion.div
            className="hover:animate-shake hover:text-white hover:drop-shadow-[0_0_8px_white]"
            initial="initial"
            animate="animate"
            variants={typingVariantsPart1}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} 
          >
            {textPart1}
          </motion.div>
        </div>

        
        <div className="text-white flex justify-center items-center font-mono text-2xl md:text-4xl text-center">
          <motion.div
            className="hover:animate-shake hover:text-white hover:drop-shadow-[0_0_8px_white]"
            initial="initial"
            animate="animate"
            variants={typingVariantsPart2}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} 
          >
            {textPart2}
          </motion.div>
        </div>

        {/* Get Started Button */}
        <div className='flex items-center justify-center mt-12'>
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={buttonVariants}
          >
            <Button variant='primary'onClick={getAnotherPage}>Get Started</Button>
          </motion.div>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-[#121212] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Made with ❤️ by Your Team
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;