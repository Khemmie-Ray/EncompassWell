import { CgHomeAlt } from "react-icons/cg";
import { BiBox } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { ImCart } from "react-icons/im";
import { NavLink } from "react-router-dom";
import logo from '../assets/mini.svg';
import { useDisconnect } from "@web3modal/ethers/react";
import { RiChatHistoryFill } from "react-icons/ri";
import { SiChatbot } from "react-icons/si";

const Sidebar = () =>  {
  const { disconnect } = useDisconnect()

  const activeStyle = {
    background: '#F86737',
    borderRadius: '10px',
    color: '#030A04',
    width: '100%',
    padding: '20px'
  };

  return (
    <div className='w-[20%] text-white p-8 py-12 h-[100vh] hidden lg:flex md:flex flex-col border-r border-grey'>
      <img src={logo} alt='logo'className="mb-20 w-[150px]" />
      <NavLink to="/dashboard" className="text-[14px] flex items-center py-4 mb-6 px-4" style={({isActive}) => isActive ? activeStyle : null } end><CgHomeAlt className="mr-4" />Dashboard</NavLink>
      <NavLink to="marketplace" className="text-[14px] flex items-center py-4 mb-6 px-4" style={({isActive}) => isActive ? activeStyle : null }><ImCart className="mr-4" /> Marketplace</NavLink>
      <NavLink to="aichat" className="text-[14px]   flex items-center py-4 mb-6 px-4" style={({isActive}) => isActive ? activeStyle : null }><SiChatbot className="mr-4" />AI Chat</NavLink>
      <NavLink to="history" className="text-[14px]   flex items-center py-4 mb-6 px-4" style={({isActive}) => isActive ? activeStyle : null }><RiChatHistoryFill className="mr-4" />History</NavLink>
      <button className="text-[16px]   flex items-center py-4 mb-4 px-4 mt-auto border-t border-grey" onClick={() => disconnect()}><TbSettings className="mr-4"  /> Log out</button>
    </div>
  );
}

export default Sidebar;