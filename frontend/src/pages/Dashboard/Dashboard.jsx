import React, { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import AICards from '../../components/AICards';
import { IoArrowUpCircle } from "react-icons/io5";
import logo from '../../assets/logo.svg'
import ConnectButton from '../../components/ConnectButton';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Afternoon');
    } else {
      setGreeting('Evening');
    }
  }, []);

  return (
    <main>
        <section className='flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col'>
        <div className='flex justify-between lg:hidden md:hidden  pb-12 px-4 items-center'>
        <img src={logo} alt="" className='w-[50px]'/>
          <ConnectButton />
          </div>
            <h2 className='lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4'>Home</h2>       
            <div className='flex justify-between lg:w-[50%] md:w-[50%] w-[100%] px-4 mb-4'>
                <IoNotificationsCircleOutline className='text-5xl'/>
            <div className="flex items-center lg:w-[80%] md:w-[80%] w-[80%] rounded-full border border-grey px-6 py-4">
            <FaSearch className="mr-4 text-xl" />
            <input
              type="text"
              placeholder="Search"
              required
              className="bg-transparent outline-0"
            />
            </div>
          </div>
          <div className='hidden lg:flex md:flex'>
          <ConnectButton />
          </div>
        </section>
        <section className='lg:w-[80%] md:w-[80%] w-[90%] mx-auto'>
          <h2 className='lg:text-[40px] md:text-[40px] text-[28px] text-center mt-24'>Good <span className='font-InstrumentSerif italic'> {greeting}</span>, What’s on your mind?</h2>
          <p className='text-center font-[300] mb-6'>If you need any help getting started, you can start with these options </p>
          <AICards />
        </section>
      <section className='lg:w-[80%] md:w-[80%] w-[90%] mx-auto'>
      <div className="flex items-center w-[100%] rounded-full border border-grey pl-6 justify-between bg-gradient-to-tr from-[#151A16] to-[#666666]/5 shadow-lg shadow-grey/20" onClick={() => navigate('aichat')}>
            <input
              type="text"
              placeholder="Write a message"
              readOnly
              className="bg-transparent outline-0"
            />
            <button className='text-secondary'><IoArrowUpCircle className='text-[60px]'/></button>
            </div>
            <div className='my-6'>
              <button className='bg-gradient-to-tr from-[#151A16] to-[#666666]/20 mr-4 px-6 py-2 rounded-full border border-grey mb-4'>Play calming sounds</button>
              <button className='bg-gradient-to-tr from-[#151A16] to-[#666666]/20 mr-4 px-6 py-2 rounded-full border border-grey mb-4'>Create art</button>
              <button className='bg-gradient-to-tr from-[#151A16] to-[#666666]/20 mr-4 px-6 py-2 rounded-full border border-grey mb-4'>Just want to talk</button>
            </div>
      </section>
    </main>
  )
}

export default Dashboard