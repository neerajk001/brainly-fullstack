import React, { forwardRef } from "react";
import { motion } from "framer-motion";

interface InputProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Forward the ref properly
const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, onChange }, ref) => {
  return (
    <motion.input
      className="px-2 py-1 rounded-md border bg-black text-white"
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      type="text"
      whileFocus={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
  );
});

export default Input;
