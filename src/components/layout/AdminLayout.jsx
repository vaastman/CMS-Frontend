import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[color:var(--color-background)] p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
