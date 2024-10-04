import React from 'react'

const WalletConnected = ({address, icon}) => {
    const formatAddress = (address) => {
        return `${address?.slice(0, 6)}........${address?.slice(-4)}`
    }

    return (
        <span className="flex items-center gap-1">
            <span className=" overflow-hidden">
                <img src={icon} alt="Icon" className="w-[20px] h-[20px] mx-2 object-cover" />
            </span>
            <span className="text-gray-200">{formatAddress(address)}</span>
        </span>
    )
}

export default WalletConnected;