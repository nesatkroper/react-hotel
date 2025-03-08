import React from "react";
// import AppToast from "@/components/app/utils/app-toast";

// const Test = () => {
//   return <AppToast />;
// };

// export default Test;
import { motion } from "framer-motion";

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // End state
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth timing
    >
      <h1>Hello, Smooth Animation!</h1>
    </motion.div>
  );
}

export default AnimatedComponent;
