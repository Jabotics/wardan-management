import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import Sidebar from './sidebar'
// import useIsCollapsed from '@/hooks/use-is-collapsed'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store'
// import { useEffect } from 'react'
// import { Loader } from '.'

export default function AppShell() {
  // const navigate = useNavigate()
  // const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  // const isAuthenticated = useSelector((state: RootState) => state.auth.token)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // }, [navigate, isAuthenticated])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
