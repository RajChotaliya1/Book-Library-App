import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { paths } from "../../constant/menuItems";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const signupSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters.",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.email": "Enter a valid email.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:'\",.<>/?]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
      "string.empty": "Password is required.",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "any.required": "Confirm Password is required.",
  }),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: joiResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { username: data.username },
      },
    });

    if (error) {
      setError("root", { message: error.message });
      toast.error(error.message || "Signup failed");
    } else {
      toast.success("Signup successful! Please check your email.");
      setTimeout(() => navigate(paths.login), 1500);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full bg-white rounded-xl shadow-xl p-5 sm:p-8 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2
          className="text-lg sm:text-3xl font-bold text-center text-gray-700 mb-3 sm:mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Sign Up
        </motion.h2>

        <motion.form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center relative">
              <FaUser className="absolute left-3 text-gray-400 text-sm sm:text-base" />
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </motion.div>

          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center relative">
              <FaEnvelope className="absolute left-3 text-gray-400 text-sm sm:text-base" />
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center relative">
              <FaLock className="absolute left-3 text-gray-400 text-sm sm:text-base" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
              {passwordValue && (
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.div
            className="mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center relative">
              <FaLock className="absolute left-3 text-gray-400 text-sm sm:text-base" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
              {confirmPasswordValue && (
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full text-sm sm:text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md cursor-pointer active:scale-98"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Create an Account
          </motion.button>

          <motion.div
            className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Already have an account?{" "}
            <Link
              to={paths.login}
              className="text-blue-500 font-medium cursor-pointer"
            >
              Log In
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
