import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetTokenAndCredentials } from "../../store/auth-slice";
import Button from "../../components/common/button";

const UserHeader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">KYC System</h1>
        <Button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-black rounded-md shadow hover:bg-red-600 transition"
          label='Logout'
        />
      </div>
    </header>
  )
}

export default UserHeader;