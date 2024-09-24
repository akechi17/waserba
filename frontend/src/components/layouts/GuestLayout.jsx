import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div className='h-screen'>
      <div className='flex min-h-full bg-white'>
        <Outlet />
      </div>
    </div>
  );
}
