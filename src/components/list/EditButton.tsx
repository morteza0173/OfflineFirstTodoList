"use client";
import { Edit } from "lucide-react";
import EditNoteForm from "../noteForm/EditNoteForm";
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

const EditButton = ({ item }: { item: items }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const closeEdit = () => setIsOpenEdit(false);

  return (
    <>
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
    </>
  );
};
export default EditButton;
