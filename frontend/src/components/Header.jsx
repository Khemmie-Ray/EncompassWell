import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import {
  useWalletInfo,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import WalletConnected from './WalletConnected';

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletInfo } = useWalletInfo();
  const [isOpen, setOpen] = useState(false);

  return isConnected ? <Navigate to={'/dashboard'} /> : (
    <header className="lg:w-[70%] md:w-[70%] w-[90%] mx-auto font-[600] text-grey text-[16px] px-4 lg:py-10 md:py-10 py-4 border-l border-r border-b border-lightGrey rounded-bl-3xl rounded-br-3xl">
      <nav className="w-[85%] mx-auto lg:flex md:flex justify-between items-center hidden">
        <NavLink to="/" className="hover:text-white focus:text-white">
          Home
        </NavLink>
        <a href="#" className="hover:text-white focus:text-white">Partnerships</a>
        <a href="#topArtist" className="hover:text-white focus:text-white">Top Artists</a>
        <a href="#about" className="hover:text-white focus:text-white">About</a>
        <button
          onClick={() => open()}
          className="bg-secondary rounded-full px-6 py-4 text-primary"
        >
          {isConnected ? (
            <WalletConnected address={address} icon={walletInfo?.icon} />
          ) : (
            <>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      </nav>
      <div className="lg:hidden md:hidden block">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color="#427142"
          direction="right"
        />
        {isOpen && (
          <nav className="bg-primary text-center flex flex-col p-8 py-12 h-[100vh] w-[100%] absolute top-24 left-0 bg-baseBlack/70 z-50 lg:hidden md:hidden">
            <NavLink to="/" className="hover:text-white focus:text-white mb-6">
              Home
            </NavLink>
            <a href="#" className="hover:text-white focus:text-white mb-6">
              Partnerships
            </a>
            <a href="#topArtist" className="hover:text-white focus:text-white mb-6">
              Top Artists
            </a>
            <a href="about" className="hover:text-white focus:text-white mb-6">
              About
            </a>
            <button
              onClick={() => open()}
              className="bg-secondary rounded-full px-6 py-4 text-primary"
            >
              {isConnected ? (
                <WalletConnected address={address} icon={walletInfo?.icon} />
              ) : (
                <>
                  <span>Connect Wallet</span>
  
                </>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
