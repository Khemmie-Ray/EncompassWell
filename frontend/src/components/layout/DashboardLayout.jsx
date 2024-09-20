import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

const DashboardLayout = () => {
  return (
    <div className='flex justify-between'>
        <Sidebar />
        <div className='w-[80%] py-6'>
        <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout