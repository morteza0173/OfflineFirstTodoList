"use client";
import { Trash2 } from "lucide-react";
import DeleteNote from "../noteForm/DeleteNote";
import { ResponsiveDialog } from "../ResponsiveDialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { PendingType } from "@/lib/indexeddb";

interface items {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  pending?: PendingType | undefined;
}

const DeleteButton = ({ item }: { item: items }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const closeDelete = () => setIsOpenDelete(false);
  return (
    <>
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
    </>
  );
};
export default DeleteButton;
