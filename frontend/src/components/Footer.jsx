import React from "react";
import logo from "../assets/logo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { ImFacebook2 } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaSquareTwitter } from "react-icons/fa6";
import textLogo from '../assets/b-logo.svg'

const Footer = () => {
  return (
    <footer className="my-6">
        <img src={textLogo} alt="" className="w-[100%] h-[10vh] lg:h-[25vh] md:h-[25vh]"/>
      <section className="py-10 border-t border-l border-r border-lightGrey rounded-tl-3xl rounded-tr-3xl">
      <div className="flex justify-between w-[90%] mx-auto flex-col lg:flex-row md:flex-row">
        <div className="lg:w-2/6 md:w-2/6 w-[100%] self-center">
        <img src={logo} alt="" className="lg:w-[220px] md:w-[220px] w-[160px] mx-auto lg:mx-0 md:mx-0 mb-6"/>
        </div>
        <div className="flex flex-col lg:w-1/6 md:w-1/6 w-[100%] text-center lg:text-left md:text-left mb-6">
          <a href="" className="text-[18px] font-[600] mb-4">About</a>
          <a href="" className="mb-4">Partners</a>
          <a href="" className="mb-4">Careers</a>
          <a href="" className="mb-4">Press</a>
          <a href="">Community</a>
        </div>
        <div className="flex flex-col lg:w-1/6 md:w-1/6 w-[100%] text-center lg:text-left md:text-left mb-6">
          <a href="" className="text-[18px] font-[600] mb-4">Listing</a>
          <a href="" className="mb-4">Features</a>
          <a href="" className="mb-4">How It Works</a>
          <a href="">Pricing</a>
        </div>
        <div className="flex flex-col lg:w-1/6 md:w-1/6 w-[100%] text-center lg:text-left md:text-left mb-6">
          <a href="" className="text-[18px] font-[600] mb-4">Community</a>
          <a href="" className="mb-4">Events</a>
          <a href="" className="mb-4">Forum</a>
          <a href="" className="mb-4">Forum</a>
          <a href="" className="mb-4">Podcast</a>
          <a href="" >Telegram</a>
        </div>
        <div className="lg:w-1/6 md:w-1/6 w-[100%] text-center lg:text-left md:text-left mb-6">
          <a href="" className="text-[18px] font-[600]">Our Office</a>
          <p className="my-4">8 The Green, Dover, Delaware 19901 United States</p>
          <p className="mb-4">4 Barnawa Close, Barnawa, Kaduna</p>
        </div>
      </div>
      </section>
      <div className="flex justify-between w-[90%] mx-auto items-center lg:py-6 md:py-6 py-2 flex-col lg:flex-row md:flex-row">
        <p>&copy; 2024 EncompassWell All rights reserved.</p>
        <div className="text-center lg:text-left md:text-left my-6">
        <a href="#" className="mr-8">Privacy</a>
          <a href="#" className="mr-8">Security</a>
          <a href="#" className="mb-4">Terms</a>
        </div>
        <div className="flex text-2xl">
            <GrLinkedin className="mr-4" />
            <ImFacebook2 className="mr-4" />
            <AiFillInstagram className="mr-4" />
            <FaSquareTwitter className="mr-4" />
            <TbBrandYoutubeFilled />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
