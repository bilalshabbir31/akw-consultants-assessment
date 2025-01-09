import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KYCForm from "../../components/user/kycform";
import { fetchUserKYCRequests } from "../../store/user/kyc";
import Button from "../../components/common/button";
import UserHeader from "./header";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { kycRequests, error } = useSelector((state) => state.userKyc);

  useEffect(() => {
    dispatch(fetchUserKYCRequests());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader />
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Your KYC Requests</h3>

          <table className="w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Document Type</th>
                <th className="px-4 py-2 text-left">Id Document</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Submitted Date</th>
              </tr>
            </thead>
            <tbody>
              {kycRequests && kycRequests.length > 0 ? (
                kycRequests.map((request) => (
                  <tr key={request._id} className="border-t">
                    <td className="px-4 py-2">{request.name}</td>
                    <td className="px-4 py-2">{request.email}</td>
                    <td className="px-4 py-2">{request.documentType}</td>
                    <td className="px-4 py-2">{request.idDocument}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded ${request.status === "approved"
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
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No KYC requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Button onClick={() => setShowModal(true)}
          className="px-4 py-2 text-white bg-black rounded-md shadow hover:bg-blue-800"
          label='Add KYC Request'
        />
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-md">

              <Button onClick={() => setShowModal(false)} className="absolute top-3 right-3 px-4 py-2 text-white bg-black hover:bg-blue-800 rounded-md shadow" label='x' />
              <h3 className="text-lg font-bold mb-4 text-center">Add KYC Request</h3>
              <div className="overflow-y-auto max-h-[80vh]">
                <KYCForm closeModal={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
