import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRequestedUsers, updateRequestStatus, updateUserRequestStatus } from "../../store/admin/kyc"
import { toast } from "react-toastify";
import Button from "../../components/common/button";


const AdminRequests = () => {

  const { requestedUsers, loading } = useSelector(state => state.adminKyc);
  const dispatch = useDispatch();

  function handleUpdateStatus(requestId, status) {
    dispatch(updateRequestStatus({ requestId, status })).then(data => {
      if (data?.payload?.success) {
        dispatch(updateUserRequestStatus({ requestId, status }))
        toast.success('Request status updated successfully!');
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllRequestedUsers())
  }, [dispatch]);


  if (!requestedUsers) {
    return <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold text-gray-600">Loading...</h1>
    </div>
  }

  return (
    <section className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Document Type</th>
              <th className="px-4 py-2 text-left">Id Document</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Submitted Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requestedUsers && requestedUsers.length > 0 ? (
              requestedUsers.map((request) => (
                <tr key={request._id} className="border-t">
                  <td className="px-4 py-2">{request?.name}</td>
                  <td className="px-4 py-2">{request?.email}</td>
                  <td className="px-4 py-2">{request?.address}</td>
                  <td className="px-4 py-2">{request?.documentType}</td>
                  <td className="px-4 py-2">
                    <a
                      href={request?.idDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${request?.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : request.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(request?.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      onClick={() => handleUpdateStatus(request?._id, 'approved')}
                      label="Approve"
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    />
                    <Button
                      onClick={() => handleUpdateStatus(request?._id, 'rejected')}
                      label="Reject"
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ml-2"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  {
                    loading ? 'Loading...' : 'No requests found.'
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminRequests;
