// SPDX-Licence-Identifier: UNLICENSE
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract BirbsNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('birbs','BRB') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 10000;
        maxPerWallet = 3;
        //withdrawWallet
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_),'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri,Strings.toString(tokenId_),".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{ value: address(this).balance}('');
        require(success,'withdraw failed');
    }
   
    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

        for (uint256 i = 0; i < quantity_; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            walletMints[msg.sender]++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
