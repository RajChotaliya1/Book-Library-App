import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    } else {
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate(paths.login);
      }, 4000);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-white text-black px-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full flex flex-col h-full items-center justify-center px-6 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-sm mx-auto p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800 text-center">
         <CgProfile className="inline w-7 h-7 mb-1" /> Profile
        </h2>
        <div className="space-y-3 text-gray-700 break-words">
          <p>
            <strong>Username:</strong>{" "}
            {user.user_metadata?.username || "Not set"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg cursor-pointer active:scale-98 ${
            isLoggingOut ? "opacity-60 cursor-not-allowed" : ""
          }`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
