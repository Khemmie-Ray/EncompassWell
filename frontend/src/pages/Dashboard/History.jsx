import React from 'react'
import ConnectButton from '../../components/ConnectButton'
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import useGetAllNft from '../../Hooks/useGetAllNft';

const History = () => {
    const allNft = useGetAllNft();

  return (
    <main>
         <section className='flex py-6 border-b border-grey justify-between lg:flex-row md:flex-row flex-col'>
        <div className='flex justify-between lg:hidden md:hidden  pb-12 px-4 items-center'>
        <img src={logo} alt="" className='w-[50px]'/>
          <ConnectButton />
          </div>
            <h2 className='lg:text-[24px] md:text-[24px] text-[20px] font-InstrumentSerif px-4 italic mb-4'>History</h2>       
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
      <section className="p-4 flex flex-col my-8 lg:w-[80%] md:w-[80%] w-[90%] mx-auto">
        {allNft && allNft.length > 0 ? (
          <div className="flex justify-between lg:flex-row md:flex-row flex-col flex-wrap">
            {allNft.map((nft, index) => (
              <div key={index} className="w-[100%] lg:w-[32%] md:w-[32%] mb-4">
                <img src={nft} alt='' className="w-full h-auto rounded-2xl" />
              </div>
            ))}
          </div>
        ) : (
          <p className='m-auto text-[24px]'>No NFTs found.</p>
        )}
      </section>
    </main>
  )
}

export default History