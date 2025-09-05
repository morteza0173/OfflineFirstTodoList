"use client";

import { Import, Notebook, SquarePen } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { getRelativeTime } from "@/lib/getRelativeTime";

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
}

const ListContent = ({ item }: ListContentProps) => {
  return (
    <Card className="z-10 rounded-sm w-full py-2">
      <CardContent className="px-2">
        <div className="flex gap-2 items-center">
          <Notebook size={20} />
          <h3 className="text-sm md:text-lg font-semibold">{item.title}</h3>
          {item.pending === "add" && (
            <div className="w-2 h-2 rounded-full bg-amber-300" />
          )}
          {item.pending === "edit" && (
            <div className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1">
            <Import size={16} color="gray" strokeWidth={1} />
            <p className="text-xs text-gray-500 ">
              تاریخ ثبت : {getRelativeTime(item.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {item.updatedAt.getTime() !== item.createdAt.getTime() && (
              <>
                <SquarePen size={14} color="gray" strokeWidth={1} />
                <p className="text-xs text-gray-500 ">
                  تاریخ ویرایش : {getRelativeTime(item.updatedAt)}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ListContent;
