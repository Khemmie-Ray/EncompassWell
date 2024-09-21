import { useCallback, useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getMarketplaceContract } from "../constants/contract";
import { wssProvider } from "../constants/providers";
import { ethers } from "ethers";

const useGetListing = () => {
    const [allNft, setAllNft] = useState([]);
    const [count, setCount] = useState(0);

    const convertIpfsUrl = (url) => {
        if (url.startsWith("ipfs://")) {
            return url.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return url;
    };

    const fetchAllNft = useCallback(async () => {
        try {
            const contract = getMarketplaceContract(readOnlyProvider);
            const res = await contract.getListing();
            const converted = res?.map((item)=>{
                return{
                nftaddress: convertIpfsUrl(item[0]),
                owner: item[1],
                tokenId: item[2],
                price: item[3], 
              }      
            }) 
            setAllNft(converted)
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
            address: import.meta.env.VITE_MARKETPLACE_ADDRESS,
            topics: [ethers.id("ItemsList(address,address,uint, uint)")],
        };

        wssProvider.getLogs({ ...filter, fromBlock: 17545385 }).then((events) => {
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

export default useGetListing;