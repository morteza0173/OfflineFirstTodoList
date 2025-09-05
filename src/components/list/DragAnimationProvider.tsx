"use client";
import { useActiveIndex } from "@/context/ActiveIndexContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import useDragAnimationControl from "./useDragAnimationControl";

const DragAnimationProvider = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) => {
  const { activeIndex, setActiveIndex } = useActiveIndex();
  const isMobile = useIsMobile();
  const { x, handleDragEnd } = useDragAnimationControl({
    index: index,
    activeIndex,
  });
  return (
    <motion.div
      drag={isMobile ? "x" : false}
      style={{ x }}
      dragConstraints={{ left: -40, right: 40 }}
      dragElastic={0.01}
      onDragStart={() => {
        setActiveIndex(null);
        requestAnimationFrame(() => setActiveIndex(index));
      }}
      onPointerDown={() => {
        setActiveIndex(null);
        requestAnimationFrame(() => setActiveIndex(index));
      }}
      onDragEnd={handleDragEnd}
      className="bg-white z-10 w-full"
    >
      {children}
    </motion.div>
  );
};
export default DragAnimationProvider;
