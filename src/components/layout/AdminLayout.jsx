import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Top Header */}
        <TopHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[color:var(--color-background)] p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
