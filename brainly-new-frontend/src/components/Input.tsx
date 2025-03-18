import React from "react";
import { motion } from "framer-motion";

interface InputProps {
  placeholder: string;
  reference?:any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, onChange,reference }: InputProps) => {
  return (
    <motion.input
      className="px-2 py-1 rounded-md border bg-black text-white"
      placeholder={placeholder}
      onChange={onChange}
      ref={reference}
      type="text"
      whileFocus={{ scale: 1.05 }} // ⬅️ Adds scaling effect on focus
      transition={{ duration: 0.2 }}
    />
  );
};

export default Input;
