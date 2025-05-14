import React from "react";
import { motion } from "framer-motion";

const Searchfield = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-5 sm:mb-10 px-4.5 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        placeholder="Search by Book name or Author"
        className="pl-4 pr-7 w-full sm:w-3/4 md:w-1/2 h-14 outline-none border-2 border-gray-800"
        onChange={handleChange}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default Searchfield;
