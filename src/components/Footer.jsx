import React from "react";
import { IoBook } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="bg-blue-50 flex flex-col px-5 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-y-2 sm:gap-y-2.5">
        <h2 className="text-black text-xl sm:text-2xl font-sans font-medium text-center md:text-left">
          <IoBook className="inline mb-1" /> Book Library
        </h2>
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Book Library App. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
