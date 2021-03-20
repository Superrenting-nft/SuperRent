// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "../tokens/ERC721Defi.sol";

contract NFTDefiFactory {

    event tokenCreated(address indexed owner, address indexed tokenAddress);

    function createNFTDefiToken(string memory _tokenName, string memory _tokenSymbol,
                                ISuperToken cashToken, ISuperfluid host, IConstantFlowAgreementV1 cfa) external {
        // Create the token
        ERC721Defi token = new ERC721Defi({
            _tokenName: _tokenName,
            _tokenSymbol: _tokenSymbol, 
            cashToken: cashToken,
            host: host,
            cfa: cfa
        });
        token.transferOwnership(msg.sender);

        emit tokenCreated(msg.sender, address(token));
    }
}