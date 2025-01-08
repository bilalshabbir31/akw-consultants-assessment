import { Navigate, useLocation } from "react-router-dom"

const CheckAuth = ({ isAuthenticated, user, children }) => {

  const location = useLocation()

  if (location.pathname === "/") {
    return <Navigate to='/auth/login' />
  } else {
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
      return <Navigate to="/unauth-page" />
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("home")) {
      return <Navigate to="/admin/dashboard" />
    }
  }

  if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to='/auth/login' />
  }

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />
    } else {
      return <Navigate to="/home" />
    }
  }

  return (
    <>{children}</>
  )
}

export default CheckAuth