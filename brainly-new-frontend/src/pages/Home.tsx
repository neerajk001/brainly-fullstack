import React from 'react';
import { motion, Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaBrain } from 'react-icons/fa';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const goToSignup = () => navigate("/signup");

  const textPart1 = "A smarter way to remember";
  const textPart2 = "your digital brain always online";
  const typingSpeed = 0.1;

  const typingVariantsPart1: Variants = {
    initial: { width: 0, opacity: 1 },
    animate: {
      width: "100%",
      transition: {
        duration: textPart1.length * typingSpeed,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const typingVariantsPart2: Variants = {
    initial: { width: 0, opacity: 1 },
    animate: {
      width: "100%",
      transition: {
        duration: textPart2.length * typingSpeed,
        ease: [0.42, 0, 0.58, 1],
        repeat: Infinity as number,
        repeatType: "reverse",
        repeatDelay: 1,
      },
    },
  };

  const buttonVariants: Variants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const floatingVariants: Variants = {
    float: {
      y: [-10, 10],
      rotate: [-5, 5],
      transition: {
        duration: 3,
        repeat: Infinity as number,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const generateRandomPosition = () => ({
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
  });

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
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Floating Brain Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {brainIcons}
      </div>

      {/* Main Content */}
      <div className="flex-grow mt-24 flex flex-col items-center justify-center space-y-6">
        <motion.div
          className="font-mono text-2xl md:text-4xl text-center hover:animate-shake hover:drop-shadow-[0_0_8px_white]"
          initial="initial"
          animate="animate"
          variants={typingVariantsPart1}
          style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {textPart1}
        </motion.div>

        <motion.div
          className="font-mono text-2xl md:text-4xl text-center hover:animate-shake hover:drop-shadow-[0_0_8px_white]"
          initial="initial"
          animate="animate"
          variants={typingVariantsPart2}
          style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {textPart2}
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={buttonVariants}
          className="mt-12"
        >
          <Button variant="primary" onClick={goToSignup}>
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-[#121212] py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p className="mt-2">Made with ❤️ by Your Team</p>
      </footer>
    </div>
  );
};

export default Home;
