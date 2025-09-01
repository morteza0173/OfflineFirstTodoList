"use client";
import { useGetNotes } from "@/hooks/useGetNotes";
import Listitems from "./Listitems";

const List = () => {
  const { data } = useGetNotes();

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <Listitems key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
export default List;
