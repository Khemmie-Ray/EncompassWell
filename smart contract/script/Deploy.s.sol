// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {ECWNFT} from "../src/ECWNFT.sol";
import {NftMarketPlace} from "../src/marketPlace.sol";

contract DeployScript is Script {
    ECWNFT nft;
    NftMarketPlace marketPlace;

    function run() public {
        nft = new ECWNFT();
        marketPlace = new NftMarketPlace();

        console2.log("nft deployed at:", address(nft));
        console2.log("marketplace deployed at:", address(marketPlace));
    }
}
