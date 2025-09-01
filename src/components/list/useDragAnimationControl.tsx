import { useIsMobile } from "@/hooks/use-mobile";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { useEffect } from "react";

type Props = {
  index: number;
  activeIndex: number | null;
};

const useDragAnimationControl = ({ index, activeIndex }: Props) => {
  const isMobile = useIsMobile();
  const x = useMotionValue(0);

  const snapTo = (val: number) => {
    let snap = 0;
    if (val > 20) snap = 40;
    else if (val < -20) snap = -40;
    return animate(x, snap, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleDragEnd = () => {
    snapTo(x.get());
  };

  useEffect(() => {
    if (!isMobile) {
      const sequence = async () => {
        await animate(x, 0, { duration: 0.6 });
      };
      sequence();
    }
  }, [isMobile, x]);

  useEffect(() => {
    if (activeIndex !== null && activeIndex !== index) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [activeIndex, index, x]);

  useEffect(() => {
    if (isMobile && index === 0) {
      const sequence = async () => {
        await animate(x, 40, { duration: 0.6 });
        await animate(x, 0, { duration: 0.6 });
        await animate(x, 40, { duration: 0.6 });
        await animate(x, -40, { duration: 1.2 });
        await animate(x, 0, { duration: 0.6 });
      };
      sequence();
    }
  }, [isMobile, index, x]);

  return { x, handleDragEnd };
};
export default useDragAnimationControl;
