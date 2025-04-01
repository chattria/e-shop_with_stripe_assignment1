import { Outlet } from "react-router";
import { AdminNavbar } from "../components/AdminNavbar";

export const AdminLayout = () => {
  return (
    <div className="h-dvh flex flex-col px-10">
      <header className="h-[5dvh] content-center">
        <AdminNavbar />
      </header>
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
    </div>
  );
};
