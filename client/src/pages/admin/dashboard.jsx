import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKycStats } from "../../store/admin/kyc";

const AdminDashboard = () => {

  const { stats, loading } = useSelector((state) => state.adminKyc);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKycStats());
  }, [dispatch]);  

  if (loading) return <div className="flex items-center justify-center h-screen">
    <h1 className="text-3xl font-semibold text-gray-600">Loading...</h1>
  </div>

  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">KYC Dashboard</h1>
        <p className="text-gray-600">Overview of platform activity and KYC requests.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-medium text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-medium text-gray-700">Approved Requests</h2>
          <p className="text-3xl font-bold text-green-500">{stats?.approved}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-medium text-gray-700">Rejected Requests</h2>
          <p className="text-3xl font-bold text-red-500">{stats?.rejected}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-md">
          <h2 className="text-lg font-medium text-gray-700">Pending Requests</h2>
          <p className="text-3xl font-bold text-yellow-500">{stats?.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
