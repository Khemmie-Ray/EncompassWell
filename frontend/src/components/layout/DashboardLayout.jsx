import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import MobileSidebar from '../MobileSidebar'

const DashboardLayout = () => {
  return (
    <div className='flex justify-between relative lg:flex-row md:flex-row flex-col'>
        <Sidebar />
        <div className='fixed bottom-0 w-[100%]'>
      <MobileSidebar />
        </div>
        <div className='lg:w-[80%] md:w-[80%] w-[100%] py-6 h-auto lg:h-[95vh] md:h-[95vh] overflow-y-scroll'>
        <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout