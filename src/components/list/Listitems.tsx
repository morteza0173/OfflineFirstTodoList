"use client";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ListContent from "./ListContent";
import { ResponsiveDialog } from "../ResponsiveDialog";
import EditNoteForm from "../noteForm/EditNoteForm";
import { useState } from "react";
import { PendingType } from "@/lib/indexeddb";
import DeleteNote from "../noteForm/DeleteNote";

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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const closeDelete = () => setIsOpenDelete(false);
  const closeEdit = () => setIsOpenEdit(false);
  return (
    <div
      key={item.id}
      className="group relative flex items-center justify-center py-1"
    >
      <ResponsiveDialog
        open={isOpenEdit}
        onOpenChange={setIsOpenEdit}
        title="ویرایش یادداشت"
        discription="در این قسمت می توانید یادداشت خود را ویرایش کنید"
      >
        <EditNoteForm item={item} close={closeEdit} />
      </ResponsiveDialog>
      <Button
        variant={"secondary"}
        className="absolute right-0 w-[20%] h-[80%] flex items-center justify-start cursor-pointer md:group-hover:translate-x-[40px]"
        onClick={() => setIsOpenEdit(true)}
      >
        <Edit className="w-20 h-20" />
      </Button>
      <ListContent item={item} index={index} />
      <ResponsiveDialog
        open={isOpenDelete}
        onOpenChange={setIsOpenDelete}
        title="حذف یادداشت"
        discription="آیا از حذف این یادداشت اطمینان دارید؟"
      >
        <DeleteNote item={item} close={closeDelete} />
      </ResponsiveDialog>
      <Button
        variant={"destructive"}
        className="absolute left-0 w-[20%] h-[80%] flex items-center justify-end cursor-pointer md:group-hover:translate-x-[-40px]"
        onClick={() => setIsOpenDelete(true)}
      >
        <Trash2 className="w-20 h-20" />
      </Button>
    </div>
  );
};
export default Listitems;
