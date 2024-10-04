// SPDX-License-Identifier: MIT
pragma solidity ~0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error NftMarketPlace__PriceMustBeAboveZero();
error NftMarketPlace__NotApprovedForMarketPlace();
error NftMarketPlace__AlreadyListed(address, uint256);
error NftMarketPlace__NotOwner();
error NftMarketPlace__NotListed(address, uint256);
error NftMarketPlace__PriceNotMet(address, uint256, uint256);
error NftMarketPlace__NoProceeds();
error NftMarketPlace__TransferFailed();

contract NftMarketPlace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(address => mapping(uint256 => Listing)) private s_listings;
    mapping(address => uint256) private s_proceeds;
    uint256[] private listedNfts; // Array of NFT IDs ready to be sold

    event ItemsList(address indexed nftAddress, address indexed seller, uint256 indexed tokenId, uint256 price);
    event ItemBought(address indexed buyer, address indexed nftAddress, uint256 indexed tokenId, uint256 price);

    event ItemCanceled(address indexed seller, address indexed nftAddress, uint256 indexed tokenId);

    constructor() {}

    modifier notListed(address nftAddress, uint256 tokenId, uint256 price) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price > 0) {
            revert NftMarketPlace__AlreadyListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = s_listings[nftAddress][tokenId];
        if (listing.price <= 0) {
            revert NftMarketPlace__NotListed(nftAddress, tokenId);
        }
        _;
    }

    modifier isOwner(address nftAddress, uint256 tokenId, address spender) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NftMarketPlace__NotOwner();
        }
        _;
    }

    function listItems(address nftAddress, uint256 tokenId, uint256 price)
        external
        notListed(nftAddress, tokenId, price)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        if (price <= 0) {
            revert NftMarketPlace__PriceMustBeAboveZero();
        }

        IERC721 nft = IERC721(nftAddress);
        if (nft.getApproved(tokenId) != address(this)) {
            revert NftMarketPlace__NotApprovedForMarketPlace();
        }
        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
        listedNfts.push(tokenId); // Add NFT ID to listed array
        emit ItemsList(nftAddress, msg.sender, tokenId, price);
    }

    function buyItems(address nftAddress, uint256 tokenId, uint256 price)
        external
        payable
        nonReentrant
        isListed(nftAddress, tokenId)
    {
        Listing memory listedItems = s_listings[nftAddress][tokenId];
        if (msg.value < listedItems.price) {
            revert NftMarketPlace__PriceNotMet(nftAddress, tokenId, price);
        }
        s_proceeds[listedItems.seller] += msg.value;
        removeNftFromListed(tokenId); // Remove NFT ID from listed array
        IERC721(nftAddress).safeTransferFrom(listedItems.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, listedItems.price);
    }

    function cancelListing(address nftAddress, uint256 tokenId)
        external
        isOwner(nftAddress, tokenId, msg.sender)
        isListed(nftAddress, tokenId)
    {
        delete (s_listings[nftAddress][tokenId]);
        removeNftFromListed(tokenId); // Remove NFT ID from listed array
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function updateListing(address nftAddress, uint256 tokenId, uint256 newPrice)
        external
        isListed(nftAddress, tokenId)
        isOwner(nftAddress, tokenId, msg.sender)
    {
        s_listings[nftAddress][tokenId].price = newPrice;
        emit ItemsList(nftAddress, msg.sender, tokenId, newPrice);
    }

    function withdrawProceeds() public payable {
        uint256 proceeds = s_proceeds[msg.sender];
        if (proceeds <= 0) {
            revert NftMarketPlace__NoProceeds();
        }
        s_proceeds[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{value: proceeds}("");
        if (!success) {
            revert NftMarketPlace__TransferFailed();
        }
    }

    function getListing(address nftAddress, uint256 tokenId) external view returns (Listing memory) {
        return s_listings[nftAddress][tokenId];
    }

    function getProceeds(address seller) external view returns (uint256) {
        return s_proceeds[seller];
    }

    function getListedNfts() external view returns (uint256[] memory) {
        return listedNfts;
    }

    // Internal function to remove NFT ID from the listedNfts array
    function removeNftFromListed(uint256 tokenId) internal {
        for (uint256 i = 0; i < listedNfts.length; i++) {
            if (listedNfts[i] == tokenId) {
                listedNfts[i] = listedNfts[listedNfts.length - 1];
                listedNfts.pop();
                break;
            }
        }
    }
}
