import List from "@/components/list/List";
import AddNoteForm from "@/components/noteForm/AddNoteForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-xs md:w-md flex flex-col gap-6">
        <AddNoteForm />
        <List />
      </div>
    </div>
  );
}
