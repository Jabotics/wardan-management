import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './sidebar/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store'
// import { useEffect } from 'react'
// import { Loader } from '.'

export default function AppShell() {
  // const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  // const isAuthenticated = useSelector((state: RootState) => state.auth.token)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login')
  //   }
  // }, [navigate, isAuthenticated])

  return (
    <div className='relative h-screen overflow-hidden bg-gray-50'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Navbar />
        <div className='px-2 py-3 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
