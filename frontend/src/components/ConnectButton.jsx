import React from 'react'
import {
    useWalletInfo,
    useWeb3Modal,
    useWeb3ModalAccount,
  } from "@web3modal/ethers/react";
import WalletConnected from './WalletConnected';

const ConnectButton = () => {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletInfo } = useWalletInfo();

  return (
    <button
    onClick={() => open()}
    className="pr-8"
  >
    {isConnected ? (
      <WalletConnected address={address} icon={walletInfo?.icon} />
    ) : (
      <>
        <span>Connect Wallet</span>
      </>
    )}
  </button>
  )
}

export default ConnectButton