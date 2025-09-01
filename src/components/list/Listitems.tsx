"use client";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ListContent from "./ListContent";

interface items {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ListItemProps {
  item: items;
  index: number;
}

const Listitems = ({ item, index }: ListItemProps) => {

  return (
    <div
      key={item.id}
      className="group relative flex items-center justify-center py-1"
    >
      <Button
        variant={"secondary"}
        className="absolute right-0 w-[20%] h-[80%] flex items-center justify-start cursor-pointer md:group-hover:translate-x-[40px]"
      >
        <Edit className="w-20 h-20" />
      </Button>
      <ListContent
        item={item}
        index={index}
      />
      <Button
        variant={"destructive"}
        className="absolute left-0 w-[20%] h-[80%] flex items-center justify-end cursor-pointer md:group-hover:translate-x-[-40px]"
      >
        <Trash2 className="w-20 h-20" />
      </Button>
    </div>
  );
};
export default Listitems;
