import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div className="h-dvh flex flex-col px-10">
      <header className="h-[5dvh] content-center">
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-[5dvh] content-center">footer</footer>
    </div>
  );
};
