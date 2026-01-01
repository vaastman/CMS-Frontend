import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";

const TopHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search student ID, name, or module..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 ml-6">
        <div className="relative cursor-pointer">
          <FiBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <FiHelpCircle className="text-gray-600 text-lg cursor-pointer" />
      </div>

    </header>
  );
};

export default TopHeader;
