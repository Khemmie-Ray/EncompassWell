import { CgHomeAlt } from "react-icons/cg";
import { BiBox } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { ImCart } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { RiChatHistoryFill } from "react-icons/ri";
import { SiChatbot } from "react-icons/si";

const MobileSidebar = () =>  {

  const activeStyle = {
    background: '#B9A7C3',
    borderRadius: '10px',
    color: '#030A04',
    padding: '10px'
  };

  return (
    <div className='w-[100%] text-white px-6 py-2 flex lg:hidden md:hidden border-t border-grey bg-white/20 items-center justify-between backdrop-blur-[20px] rounded-full text-center'>
      <NavLink to="/dashboard" className="text-[24px] py-4 px-4" style={({isActive}) => isActive ? activeStyle : null } end><CgHomeAlt /></NavLink>
      <NavLink to="marketplace" className="text-[20px] py-4 px-4" style={({isActive}) => isActive ? activeStyle : null }><ImCart /></NavLink>
      <NavLink to="aichat" className="text-[20px] py-4 px-4" style={({isActive}) => isActive ? activeStyle : null }><SiChatbot /></NavLink>
      <NavLink to="history" className="text-[20px] py-4 px-4" style={({isActive}) => isActive ? activeStyle : null }><RiChatHistoryFill /></NavLink>
    </div>
  )
}

export default MobileSidebar