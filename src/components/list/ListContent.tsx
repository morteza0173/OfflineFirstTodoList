"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import useDragAnimationControl from "./useDragAnimationControl";
import { useActiveIndex } from "@/context/ActiveIndexContext";

interface items {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  pending?: string | null;
}

interface ListContentProps {
  item: items;
  index: number;
}

const ListContent = ({ item, index }: ListContentProps) => {
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
      <Card className="z-10 rounded-sm w-full">
        <CardContent>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">
            وضعیت: {item.completed ? "انجام شده" : "انجام نشده"}
          </p>
          {item.pending === "add" ||
            (item.pending === "edit" && (
              <p className="text-sm text-amber-500">در سرور ذخیره نشده</p>
            ))}{" "}
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default ListContent;
