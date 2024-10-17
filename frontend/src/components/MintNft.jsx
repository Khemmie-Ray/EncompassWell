import React, { useState } from "react";
import { getProvider } from "../constants/providers";
// import { isSupportedChain } from '../connection/index'
import { getNFTMintContract } from "../constants/contract";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageDownloader } from "@samvera/image-downloader";

const MintNft = ({ item }) => {
  const { address } = useWeb3ModalAccount();
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        setError("File size exceeds 1MB. Please choose a smaller file.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
        handleSubmission(file);
      }
    }
  };

  const handleSubmission = async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const metadata = JSON.stringify({
        name: "Avatar",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setImageUrl(`ipfs://${resData.IpfsHash}`);

      toast.success("Upload Successful", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Upload failed", {
        position: "top-center",
      });
    } finally {
      setIsUploading(false);
    }
  };

  async function handleMint() {
    // if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getNFTMintContract(signer);

    try {
      const transaction = await contract.safeMint(address, imageUrl);
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
    setIsOpen(false)
  }
  
  return (
    <div className="flex justify-between lg:flex-row md:flex-row flex-col">
      <ImageDownloader
        className="bg-secondary rounded-full px-4 py-2 my-4 font-[600] text-primary lg:w-[49%] md:w-[49%] w-[100%]"
        imageUrl={item}
        imageTitle={`Beautiful image`}
      >
        Download
      </ImageDownloader>
      <button
        className="bg-secondary rounded-full px-4 py-2 my-4 font-[600] text-primary lg:w-[49%] md:w-[49%] w-[100%]"
        onClick={() => setIsOpen(true)}
      >
        Mint as NFT
      </button>
      {isOpen && (
         <dialog id="my_modal_1" className="modal modal-open">
         <div
           className="modal-box bg-black text-white rounded-lg text-center py-10 px-6 border border-[#dadada]/30"
         >
           {imageUrl ? (
            <input
              type="text"
              value={imageUrl}
              placeholder="Organization Image"
              className="bg-white/30 font-bold border border-[#110A03] text-white text-sm rounded-lg focus:ring-[#3B3B3B] focus:border-[#110A03] block w-full p-2.5 backdrop-blur-lg mb-4 outline-none"
              readOnly
            />
          ) : (
            <div className="relative mb-4">
              <input
                type="file"
                placeholder="Organization Image"
                className={`bg-white/30 font-bold border border-[#110A03] text-white text-sm rounded-lg focus:ring-[#3B3B3B] focus:border-[#110A03] block w-full p-2.5 backdrop-blur-lg outline-none ${isUploading ? "cursor-not-allowed" : ""}`}
                onChange={changeHandler}
                disabled={isUploading}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
                  <div className="loader"></div> {/* Add your loading spinner here */}
                </div>
              )}
                 </div>
          )}
          <button
            onClick={handleMint}
            className="bg-secondary rounded-full px-4 py-2 my-4 font-[600] text-primary  w-[100%]"
          >
            Mint 
          </button>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <button>close</button>
        </form>
      </dialog>)}
    </div>
  );
};

export default MintNft;
