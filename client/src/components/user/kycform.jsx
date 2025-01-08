import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKYCRequest } from "../../store/user/kyc";
import { toast } from "react-toastify";
import Button from "../common/button";

const initialFormData = {
  name: "",
  email: "",
  address: "",
  documentType: "",
};

const KycForm = ({ closeModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, kycRequests } = useSelector((state) => state.userKyc);
  const fileInputRef = useRef()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("documentType", formData.documentType);
    formDataToSubmit.append("idDocument", file);

    dispatch(addKYCRequest(formDataToSubmit)).then((data) => {
      if (data?.payload?.success) {
        setFormData(initialFormData);
        fileInputRef.current.value = "";
        if (closeModal) closeModal();
        toast.success(data?.payload?.message);
      }
    });
  };

  useEffect(() => {
    if (kycRequests && kycRequests.length > 0) {
      setFormData(initialFormData);
    }
  }, [kycRequests]);

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-96">
      <div className="mb-4">
        <label className="block mb-2 text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm">Document Type</label>
        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Document Type</option>
          <option value="Passport">Passport</option>
          <option value="National ID">National ID</option>
          <option value="Driver License">Driver's License</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm">Upload ID Document</label>
        <input
          type="file"
          name="idDocument"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md"
          required
          ref={fileInputRef}
        />
      </div>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <Button type="submit"
       className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-blue-600"
        disabled={loading}
        label={loading ? "Submitting..." : "Submit" }
         />
    </form>
  );
};

export default KycForm;
