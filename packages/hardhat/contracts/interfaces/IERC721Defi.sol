// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;

import "./IOwnable.sol";

/**
 * @dev Interface of functions that allow to lend an ERC721 safely
 */
interface IERC721Defi is IOwnable {

    function mint(uint256 _tokenId, string memory _metadata) external;

    function getNonceRent() external view returns(uint32);

    function getRents() external view returns (uint256);

    function getRentInfoByTokenId(uint256 index) external view returns (uint256);

    function cancelRent(uint256 _nonce) external;
}