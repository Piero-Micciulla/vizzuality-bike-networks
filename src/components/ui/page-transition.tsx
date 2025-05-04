"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const transitionVariants = {
  initial: { x: 0, opacity: 1 },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  enter: {
    x: [-100, 20, 0],
    opacity: [0, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const PageTransition = ({ children, className = "w-full h-full" }: Props) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={transitionVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
