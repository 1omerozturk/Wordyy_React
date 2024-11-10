import { NavLink, Outlet, useNavigation } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'
import Spin from './Spin'
// import { Spinner } from "./Spinner";

export function Layout() {
  const navigation = useNavigation()

  return (
    <>
     <ToastContainer />
      <Navbar />
      <div>
        {navigation.state === 'loading' || navigation.state === 'submitting' ? (
          <Spin />
        ) : (
          <Outlet />
        )}
      </div>
    </>
  )
}
