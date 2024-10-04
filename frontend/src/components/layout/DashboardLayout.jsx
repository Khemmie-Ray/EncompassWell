import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import MobileSidebar from '../MobileSidebar'
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const DashboardLayout = () => {
  const { isConnected } = useWeb3ModalAccount();

  return !isConnected ? (
    <Navigate to={"/"} />
  ) : (
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