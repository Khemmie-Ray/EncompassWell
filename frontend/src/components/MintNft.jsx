import React from 'react'
import { getProvider }from '../constants/providers'
import { isSupportedChain } from '../connection/index'
import { getNFTMintContract } from '../constants/contract'
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MintNft = ({ item }) => {
  const { address } = useWeb3ModalAccount();
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  // console.log(index, item)

  async function handleMint() {
    // if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getNFTMintContract(signer);

    try {
      // Assuming the smart contract's safeMint function requires a token ID (index)
      const transaction = await contract.safeMint(address, item);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      if (receipt.status) {
        return toast.success("Mint successful!", {
          position: "top-center",
        });
      }

      toast.error("Mint failed", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Mint failed!", {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <button 
        onClick={handleMint}
        className="bg-secondary rounded-full px-4 py-2 my-4 font-[600] text-primary w-[100%]"
      >
        Mint as NFT
      </button>
    </div>
  )
}

export default MintNft;