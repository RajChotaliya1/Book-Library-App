import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { motion } from "framer-motion";

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Enter a valid email.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "string.empty": "Password is required.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Login failed");
      setIsLoading(false);
    } else {
      toast.success("Login successful!");
      setTimeout(() => navigate(paths.home), 1500);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-5 sm:p-8 bg-white rounded-xl shadow-2xl border border-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-lg md:text-3xl font-bold text-gray-700 mb-3 sm:mb-6 text-center tracking-tight"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Log In
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md transition text-sm sm:text-base"
          />
        </motion.div>
        {errors.email && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.email.message}
          </p>
        )}

        <motion.div
          className="relative mt-3 sm:mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            onChange={(e) => setIsPasswordTyped(!!e.target.value)} // ✅ Track typing
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md transition text-sm sm:text-base"
          />
          {isPasswordTyped && ( 
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
          )}
        </motion.div>
        {errors.password && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">
            {errors.password.message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          className={`w-full text-sm sm:text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 sm:py-3 rounded-lg text-md font-semibold hover:shadow-lg transition-all duration-300 mt-3 sm:mt-4 cursor-pointer transform active:scale-95 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </div>
          ) : (
            "Log In"
          )}
        </motion.button>

        <motion.div
          className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Don't have an account?{" "}
          <Link to={paths.signup} className="text-blue-600 font-medium">
            Sign up
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Login;
