import List from "@/components/list/List";
import AddNoteForm from "@/components/noteForm/AddNoteForm";
import PendingInfo from "@/components/PendingInfo/PendingInfo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-xs md:w-md flex flex-col gap-2">
        <AddNoteForm />
        <PendingInfo />
        <List />
      </div>
    </div>
  );
}
