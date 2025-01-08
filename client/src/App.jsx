import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import CheckAuth from "./components/common/checkAuth";
import AuthLayout from "./components/auth/layout";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { checkAuth } from "./store/auth-slice";
import NotFound from "./pages/notFound/index";
import UnAuth from "./pages/unauth/index";
import UserLayout from "./pages/user/home";
import Home from "./pages/user/home";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminRequests from "./pages/admin/requests";

function App() {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (loading) return <div className="flex items-center justify-center h-screen">
    <h1 className="text-3xl font-semibold text-gray-600">Loading...</h1>
  </div>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} />
        } />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="requests" element={<AdminRequests />} />
        </Route>
        <Route path="/home" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuth />} />
      </Routes>
    </div>
  )
}

export default App
