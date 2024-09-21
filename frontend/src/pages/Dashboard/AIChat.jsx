import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import logo from '../../assets/logo2.svg'

const AIChat = () => {
  return (
    <main>
         <section className='flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col'>
        <img src={logo} alt="" className='block lg:hidden md:hidden w-[200px] pb-12 px-4'/>
            <h2 className='lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4'>AI Chat</h2>
         
            <div className='flex justify-between lg:w-[50%] md:w-[50%] w-[100%] px-4 mb-4'>
                <IoNotificationsCircleOutline className='text-5xl'/>
            <div className="flex items-center lg:w-[50%] md:w-[50%] w-[80%] rounded-full border border-grey px-6 py-4">
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

export default AIChat