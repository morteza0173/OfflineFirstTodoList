"use client";

import { indexeddb } from "@/lib/indexeddb";
import { useEffect, useState } from "react";

const PendingInfo = () => {
  const [deleteCount, setDeleteCount] = useState<number>(0);

  useEffect(() => {
    const fetchPendingDeletes = async () => {
      const pendingItems = await indexeddb.pendingTodos.toArray();
      const deleteItems = pendingItems.filter(
        (item) => item.pending === "delete"
      );
      setDeleteCount(deleteItems.length);
    };

    fetchPendingDeletes();

    window.addEventListener("new-todo", fetchPendingDeletes);
    return () => window.removeEventListener("new-todo", fetchPendingDeletes);
  }, []);

  return (
    <div className="border border-amber-300 rounded-md bg-amber-50">
      <p className="px-2 py-1 text-sm font-semibold text-amber-800">
        وضعیت ذخیره‌سازی یادداشت‌ها
      </p>
      <div className="flex flex-col gap-2 p-2 ">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-300" />
          <p className="text-sm">یادداشت اضافه شده در سرور ذخیره نشده</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <p className="text-sm">یادداشت ویرایش شده در سرور ذخیره نشده</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-800" />
          <p className="text-sm">
            تعداد یادداشت حذف شده ذخیره نشده در سرور : {deleteCount}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PendingInfo;
