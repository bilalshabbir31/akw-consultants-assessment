import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default UserLayout