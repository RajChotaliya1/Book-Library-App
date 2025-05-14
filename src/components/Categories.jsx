import React from "react";
import Tabbutton from "./Tabbutton";
import { motion } from "framer-motion";

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  const categories = ["Science", "Fiction", "Non-Fiction", "Fantasy", "Crime"];

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category)); 
  };

  return (
    <motion.div
      className="md:mt-10 mt-8 bg-white flex flex-col justify-center items-center mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-medium text-2xl sm:text-3xl mb-4 sm:mb-5 text-center">
        Categories Books
      </h2>
      <div className="flex flex-wrap gap-4 px-6 py-4 w-full md:w-fit rounded-md justify-center">
        {categories.map((cat) => (
          <motion.div
            key={cat}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Tabbutton
              onClick={() => handleCategoryClick(cat)} 
              isActive={selectedCategory === cat}
            >
              {cat}
            </Tabbutton>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
