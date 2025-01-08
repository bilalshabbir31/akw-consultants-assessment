import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/button";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then(data => {
      if(data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your Account</h1>
        <p className="mt-2">Don't have an Account
          <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>Register</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-xl font-bold text-center">Login</h2>
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
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-blue-800"
          disabled={loading} label={loading ? "Logging in..." : "Login"} />
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/auth/register" className="text-black font-medium text-primary hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
