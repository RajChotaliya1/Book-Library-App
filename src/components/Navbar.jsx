import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { menuItems, paths } from "../constant/menuItems";
import { fetchBooks } from "../utils/bookSlice";
import { IoBook } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <motion.nav
        className="w-full fixed top-0 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white bg-opacity-65 flex justify-between items-center p-4 sm:p-5 sticky top-0 z-50">
          <Link to={paths.home}>
            <h2 className="text-2xl sm:text-3xl font-medium text-black">
              <IoBook className="inline mb-1" /> Book Library
            </h2>
          </Link>
          <ul className="hidden md:flex items-center gap-5 text-medium font-base cursor-pointer">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#4a6da7] border-b-2 pb-0.5 border-[#4a6da7] font-medium"
                      : "text-gray-700 hover:text-[#4a6da7] transition duration-300 font-medium"
                  }
                >
                  {item?.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <HiOutlineMenu
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        <div className="p-2">
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                key="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden flex flex-col gap-5 bg-black rounded-sm text-white w-full text-sm font-base p-3"
              >
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#4a6da7] border-b-2 pb-0.5 border-[#4a6da7] font-medium"
                          : "text-gray-300 hover:text-[#4a6da7] transition duration-300 font-medium"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
