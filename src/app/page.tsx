import CustomInput from "@/components/input/CustomInput";
import List from "@/components/list/List";
import { PencilLine } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-xs md:w-md flex flex-col gap-6">
        <CustomInput label="یادداشت شما" icon={<PencilLine />} />
        <List />
      </div>
    </div>
  );
}
