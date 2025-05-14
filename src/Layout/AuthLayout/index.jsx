import React from "react";
import { Outlet } from "react-router-dom";
import GuestRoute from "../../Route/GuestRoute";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const AuthLayout = () => {
  return (
    <GuestRoute>
      <motion.div
        className="h-dvh flex items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden max-w-7xl w-full"
          variants={childVariants}
        >
          {/* Left side - Logo or Image */}
          <motion.div
            className="md:flex items-center justify-center bg-gradient-to-tr from-purple-500 to-teal-400 p-4.5 sm:p-8"
            variants={childVariants}
          >
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.img
                src="/logo.svg"
                alt="Welcome"
                className="w-30 sm:w-64 mx-auto mb-2 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold">
                Welcome to Book Library
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-teal-100">
                Securely login or sign up to continue your journey.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Auth form */}
          <motion.div
            className="w-full p-4 sm:p-10 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-teal-50"
            variants={childVariants}
          >
            <motion.div
              className="w-full max-w-sm sm:max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="mb-4 sm:mb-8 text-center">
                <h1 className="hidden sm:block text-2xl sm:text-3xl font-bold text-blue-600">
                  Book Library
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Please log in or sign up to continue
                </p>
              </div>
              <Outlet />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </GuestRoute>
  );
};

export default AuthLayout;
