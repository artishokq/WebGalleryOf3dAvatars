import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
