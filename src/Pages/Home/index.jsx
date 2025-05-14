import React, { useState } from "react";
import hero_image from "../../assets/hero_images.png";
import Categories from "../../components/Categories";
import BooksData from "../../components/BooksData";
import { motion } from "framer-motion";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <motion.section
        className="bg-[url('/bgBanner.svg')] w-full p-5 flex flex-col md:flex-row gap-10 justify-start md:justify-center items-start md:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full md:w-1/2">
          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-1 sm:mb-2 text-center md:text-left"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            The Ultimate Library Management Tool
          </motion.h2>
        </div>

        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <motion.img
            src={hero_image}
            alt="Hero"
            className="w-50 md:w-96 h-auto object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.section>

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BooksData selectedCategory={selectedCategory} />
    </>
  );
};

export default Home;
