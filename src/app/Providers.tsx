import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import AddSyncProvider from "./AddSyncProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AddSyncProvider>{children}</AddSyncProvider>
    </QueryProvider>
  );
};
export default Providers;
