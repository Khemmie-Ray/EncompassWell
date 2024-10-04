// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ECWNFT.sol"; // Adjust the path based on your project structure

contract ECWNFTTest is Test {
    ECWNFT private nftContract;

    address private owner = address(0x123);
    address private user1 = address(0x456);
    address private user2 = address(0x789);

    function setUp() public {
        // Deploy the ECWNFT contract
        nftContract = new ECWNFT();
    }

    function testMintAndTokenOfOwnerByIndex() public {
        // Mint tokens to different users
        nftContract.safeMint(owner, "tokenURI1");
        nftContract.safeMint(user1, "tokenURI2");
        nftContract.safeMint(user2, "tokenURI3");
        nftContract.safeMint(user1, "tokenURI4"); // Minting multiple to the same user

        // Verify token balances
        assertEq(nftContract.balanceOf(owner), 1);
        assertEq(nftContract.balanceOf(user1), 2);
        assertEq(nftContract.balanceOf(user2), 1);

        // Check `tokenOfOwnerByIndex`
        uint256 ownerTokenId = nftContract.tokenOfOwnerByIndex(owner, 0);
        assertEq(ownerTokenId, 0); // First minted token should be tokenId 0

        uint256 user1TokenId1 = nftContract.tokenOfOwnerByIndex(user1, 0);
        uint256 user1TokenId2 = nftContract.tokenOfOwnerByIndex(user1, 1);
        assertEq(user1TokenId1, 1); // First minted token to user1
        assertEq(user1TokenId2, 3); // Second minted token to user1

        uint256 user2TokenId = nftContract.tokenOfOwnerByIndex(user2, 0);
        assertEq(user2TokenId, 2); // First minted token to user2
    }

    function testGetAllNFTsOwnedByUser() public {
        // Mint tokens to different users
        nftContract.safeMint(owner, "tokenURI1");
        nftContract.safeMint(user1, "tokenURI2");
        nftContract.safeMint(user2, "tokenURI3");
        nftContract.safeMint(user1, "tokenURI4"); // Minting multiple to the same user

        uint256 balanceUser1 = nftContract.balanceOf(user1);
        uint256[] memory user1TokenIds = new uint256[](balanceUser1);

        // Retrieve all token IDs owned by user1
        for (uint256 i = 0; i < balanceUser1; i++) {
            user1TokenIds[i] = nftContract.tokenOfOwnerByIndex(user1, i);
        }

        // Assert the token IDs are as expected
        assertEq(user1TokenIds[0], 1); // First token ID owned by user1
        assertEq(user1TokenIds[1], 3); // Second token ID owned by user1
    }
}
