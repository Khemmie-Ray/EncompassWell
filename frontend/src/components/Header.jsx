import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Sling as Hamburger } from "hamburger-react";

const Header = () => {
    const [isOpen, setOpen] = useState(false);
  return (
    <header className='lg:w-[70%] md:w-[70%] w-[90%] mx-auto font-[600] text-grey text-[16px] px-4 lg:py-10 md:py-10 py-4 border-l border-r border-b border-lightGrey rounded-bl-3xl rounded-br-3xl'>
        <nav className='w-[85%] mx-auto lg:flex md:flex justify-between items-center hidden'>
            <NavLink to='/' className='hover:text-white focus:text-white'>Home</NavLink>
            <NavLink>Partnerships</NavLink>
            <NavLink>Top Artists</NavLink>
            <NavLink>About</NavLink>
        <button className='bg-secondary rounded-full px-6 py-4 text-primary'>Connect Wallet</button>
        </nav>
        <div className='lg:hidden md:hidden block'>
        <Hamburger toggled={isOpen} toggle={setOpen} color="#427142" direction="right"  />
        {isOpen && (
             <nav className='bg-primary text-center flex flex-col p-8 py-12 h-[100vh] w-[100%] absolute top-24 left-0 bg-baseBlack/70 z-50 lg:hidden md:hidden'>
             <NavLink to='/' className='hover:text-white focus:text-white mb-6'>Home</NavLink>
             <a href="" className='hover:text-white focus:text-white mb-6'>Partnerships</a >
             <a href="" className='hover:text-white focus:text-white mb-6'>Top Artists</a >
             <a href="" className='hover:text-white focus:text-white mb-6'>About</a >
         <button className='bg-secondary rounded-full px-6 py-4 text-primary'>Connect Wallet</button>
         </nav>
        )}</div>
    </header>
  )
}

export default Header