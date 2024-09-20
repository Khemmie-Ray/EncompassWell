import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <main>
        <section className='flex py-6 border-b border-grey'>
            <h2>Home</h2>
            <div className='flex justify-between w-[50%]'>
                <IoNotificationsCircleOutline className='text-5xl'/>
            <div className="flex items-center w-[50%] rounded-full border border-grey px-6 py-4">
            <FaSearch className="mr-4 text-xl" />
            <input
              type="text"
              placeholder="Search"
              required
              className="bg-transparent outline-0"
            />
            </div>
          </div>
        </section>
    </main>
  )
}

export default Dashboard