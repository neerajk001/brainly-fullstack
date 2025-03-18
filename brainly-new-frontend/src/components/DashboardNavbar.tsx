import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { Plus } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Brain } from 'lucide-react';

const DashboardNavbar = ({setIsOpenModal}) => {
 
  return (
    <div className='w-full flex justify-end text-white p-2 px-12  '>
      {/* <motion.div>
      <Brain size={36} color="white" strokeWidth={2} />
      </motion.div> */}
      <motion.div className='space-x-6 flex hidden md:flex'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        >
          <Button onClick={()=>setIsOpenModal(true)}
          className="py-1" variant="primary" startIcons={<Plus />}>
            add content
          </Button>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
        >
          <Button variant="primary" startIcons={<Share2 />}>
            Share
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardNavbar;
