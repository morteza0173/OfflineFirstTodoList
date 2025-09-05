"use client";
import ListContent from "./ListContent";
import { PendingType } from "@/lib/indexeddb";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import DragAnimationProvider from "./DragAnimationProvider";

interface items {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  pending?: PendingType | undefined;
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
      <EditButton item={item} />
      <DragAnimationProvider index={index}>
        <ListContent item={item} />
      </DragAnimationProvider>
      <DeleteButton item={item} />
    </div>
  );
};
export default Listitems;
