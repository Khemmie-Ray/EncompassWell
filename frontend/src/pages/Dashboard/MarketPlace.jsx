import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import logo from '../../assets/logo.svg'
import ConnectButton from '../../components/ConnectButton';

const MarketPlace = () => {
  // ['', '']
  
  return (
    <main>
            <section className='flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col'>
        <div className='flex justify-between lg:hidden md:hidden  pb-12 px-4 items-center'>
        <img src={logo} alt="" className='w-[50px]'/>
          <ConnectButton />
          </div>
            <h2 className='lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4'>Marketplace</h2>       
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
        <section className='flex justify-between lg:flex-row md:flex-row flex-col flex-wrap my-8 lg:w-[80%] md:w-[80%] w-[90%] mx-auto'>
        <button 
          className="bg-secondary rounded-full p-4 my-4 w-[100%] text-primary ml-auto lg:w-[20%] md:w-[20%]">List NFT</button>
        </section>
        <section className='flex justify-between lg:flex-row md:flex-row flex-col flex-wrap my-8 lg:w-[80%] md:w-[80%] w-[90%] mx-auto'>
          <div className="w-[90%] mx-auto lg:mx-0 md:mx-0 lg:w-[32%] md:w-[32%] mb-4 bg-[#242932] p-4 rounded-2xl">
            <img src="https://img.freepik.com/free-photo/side-view-man-portrait-digital-art_23-2151197916.jpg?size=626&ext=jpg&ga=GA1.1.663094344.1720174275&semt=ais_hybrid-rr-similar" alt="" className="rounded-2xl w-[100%] h-[200px] object-cover object-center" />
            <p className='mt-4'>Owner: 0xrt4566....BD</p>
            <p>Price: $20</p>
            <button 
          className="bg-secondary rounded-full px-4 py-2 my-4 w-[100%] text-primary">Buy</button>
          </div>
          <div className="w-[90%] mx-auto lg:mx-0 md:mx-0 lg:w-[32%] md:w-[32%] mb-4 bg-[#242932] p-4 rounded-2xl">
            <img src="https://img.freepik.com/free-photo/cyberpunk-bitcoin-illustration_23-2151611170.jpg?size=626&ext=jpg&ga=GA1.1.663094344.1720174275&semt=ais_hybrid-rr-similar" alt="" className="rounded-2xl w-[100%] h-[200px] object-cover object-center" />
            <p className='mt-4'>Owner: 0xrt4566....BD</p>
            <p>Price: $100</p>
            <button 
          className="bg-secondary rounded-full px-4 py-2 my-4 w-[100%] text-primary">Buy</button>
          </div>
        </section>
    </main>
  )
}

export default MarketPlace