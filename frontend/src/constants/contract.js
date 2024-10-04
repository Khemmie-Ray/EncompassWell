import { ethers } from "ethers";
import mintAbi from './mintAbi.json'
import nftAbi from './nftAbi.json'


export const getMarketplaceContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_MARKETPLACE_ADDRESS,
        nftAbi,
        providerOrSigner
    );

export const getNFTMintContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_NFT_ADDRESS,
        mintAbi,
        providerOrSigner
    );