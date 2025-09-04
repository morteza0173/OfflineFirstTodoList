import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import SyncProvider from "./SyncProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <SyncProvider>{children}</SyncProvider>
    </QueryProvider>
  );
};
export default Providers;
