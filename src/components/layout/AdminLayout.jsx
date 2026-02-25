import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto bg-[color:var(--color-page)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;