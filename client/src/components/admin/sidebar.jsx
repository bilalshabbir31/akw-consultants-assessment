import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="flex flex-col mt-4">
        <Link
          to="/admin/dashboard"
          className={`p-4 text-left text-gray-700 ${isActive("/admin/dashboard")
              ? "bg-gray-100 font-semibold border-l-4 border-black"
              : "hover:bg-gray-50"
            } transition`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/requests"
          className={`p-4 text-left text-gray-700 ${isActive("/admin/requests")
              ? "bg-gray-100 font-semibold border-l-4 border-black"
              : "hover:bg-gray-50"
            } transition`}
        >
          Requests
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
