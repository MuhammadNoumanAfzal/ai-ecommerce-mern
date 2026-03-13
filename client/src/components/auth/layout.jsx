import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      {/* Left Side: Animated Brand Section */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-black w-1/2 px-12 overflow-hidden">
        {/* Animated Background Blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
        />

        <div className="relative z-10 max-w-md space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-white">
              Elevate Your <span className=" text-white">Style.</span>
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
              Experience the next generation of online shopping with curated
              collections just for you.
            </p>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-10 left-10 text-white text-sm font-mono">
          © 2026 E-SHOP DESIGN SYSTEM
        </div>
      </div>

      {/* Right Side: Form Content */}
      <main className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default AuthLayout;
