import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getNFTMintContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useGetAllNft = () => {
    const [allNft, setAllNft] = useState([]);
    const [count, setCount] = useState(0);
    const { address } = useWeb3ModalAccount()

    const fetchAllNft = useCallback(async () => {
        try {
            const contract = getNFTMintContract(readOnlyProvider);
            const res = await contract.getUserNFTs(address);
            // const converted = res?.map((item)=>{
            //     return{
            //     nftaddress: convertIpfsUrl(item[0]),
            //     owner: item[1],
            //     tokenId: item[2],
            //     price: item[3], 
            //   }      
            // }) 
            setAllNft(res)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const trackingNft = useCallback(() => {
        setCount((prevValue) => prevValue + 1);
        fetchAllNft();
    }, [fetchAllNft]);


    useEffect(() => {
        fetchAllNft();

        const filter = {
            address: import.meta.env.VITE_NFT_ADDRESS,
            topics: [ethers.id("safeMint(address,string)")],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 17586220 }).then((events) => {
            setCount(events.length + 1);
        });

        const provider = new ethers.WebSocketProvider(
            import.meta.env.VITE_WSS_RPC_URL
        );
        provider.on(filter, trackingNft);

        return () => {
            // Perform cleanup
            provider.off(filter, trackingNft);
        };

    }, [fetchAllNft, trackingNft, count]);

    return allNft;
}

export default useGetAllNft;