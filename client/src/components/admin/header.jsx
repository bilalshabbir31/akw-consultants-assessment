import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import { useDispatch } from "react-redux";
import { resetTokenAndCredentials } from "../../store/auth-slice";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(resetTokenAndCredentials());
    navigate('/auth/login')
  }

  return (
    <header className="flex justify-end items-center bg-white shadow-md px-6 py-4">
      <Button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        label="Logout"
      />
    </header>

  );
};

export default AdminHeader;
