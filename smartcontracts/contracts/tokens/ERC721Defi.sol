// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;
pragma abicoder v2;

/// @author Jorge Gomes Durán - jgomes79@hotmail.es
/// @title  ERC721Defi - ERC721 for rent integrated with Superfluid
/// @dev    

import "./ERC721.sol";
import "../access/Ownable.sol";
import "../libraries/UintLibrary.sol";
import "../libraries/SafeMath.sol";

import {
    ISuperfluid,
    ISuperToken,
    ISuperAgreement,
    SuperAppDefinitions
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {
    IConstantFlowAgreementV1
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {
    SuperAppBase
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract OwnableDelegateProxy { }

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract ERC721Defi is SuperAppBase, ERC721, Ownable {
    using UintLibrary for uint256;
    using SafeMath for uint256;

    ISuperToken private _cashToken;
    ISuperfluid private _host;
    IConstantFlowAgreementV1  private _cfa;

    struct RentInfo {
        uint256 id;
        uint256 price;
        address owner;
    }

    mapping (uint256 => address) private _tokensInfo;
    mapping (address => uint256[]) private _tokenRents;
    RentInfo[] _rentingInfo;

    constructor (string memory _tokenName, string memory _tokenSymbol, ISuperToken cashToken, ISuperfluid host, IConstantFlowAgreementV1 cfa) ERC721(_tokenName,_tokenSymbol) {
        _cashToken = cashToken;
        _host = host;
        _cfa = cfa;

        uint256 configWord =
            SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
        
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    /** 
        @notice Superfluid specific code
        @dev Modifier that checks message come from Superfluid host
    */
    modifier onlyHost() {
        require(msg.sender == address(_host), "NFTDefiToken: support only one host");
        _;
    }

    /** 
        @notice Superfluid specific code
        @dev Modifier that checks token and agreement are valid
    */
    modifier onlyExpected(ISuperToken _superToken, address _agreementClass) {
        require(_isAccepted(_superToken) , "NFTDefiToken: not accepted tokens");
        require(_isCFAv1(_agreementClass), "NFTDefiToken: only CFAv1 supported");
        _;
    }

    function _isAccepted(ISuperToken _superToken) private view returns (bool) {
        return address(_superToken) == address(_cashToken);
    }

    function _isCFAv1(address _agreementClass) private view returns (bool) {
        return ISuperAgreement(_agreementClass).agreementType()
            == keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");
    }

    function beforeAgreementCreated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata agreementData,
        bytes calldata ctx
    )
        external
        view
        virtual
        override
        returns (bytes memory /*cbdata*/)
    {
        (address sender,) = abi.decode(agreementData, (address, address));
        _checkValidRent(ctx, sender);
    }

    function beforeAgreementUpdated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata agreementData,
        bytes calldata ctx
    )
        external
        view
        virtual
        override
        returns (bytes memory /*cbdata*/)
    {
        (address sender,) = abi.decode(agreementData, (address, address));
        _checkValidRent(ctx, sender);
    }

    function afterAgreementCreated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata agreementData,
        bytes calldata /*cbdata*/,
        bytes calldata ctx
    )
        external override
        onlyHost
        returns(bytes memory newCtx)
    {
        (address sender,) = abi.decode(agreementData, (address, address));
        return _rentToken(ctx, sender);
    }

    function afterAgreementUpdated(
        ISuperToken /*superToken*/,
        address /*agreementClass*/,
        bytes32 /*agreementId*/,
        bytes calldata agreementData,
        bytes calldata /*cbdata*/,
        bytes calldata ctx
    )
        external
        virtual
        override
        returns (bytes memory newCtx)
    {
        (address sender,) = abi.decode(agreementData, (address, address));
        return _rentToken(ctx, sender);
    }

    function afterAgreementTerminated(
        ISuperToken superToken,
        address agreementClass,
        bytes32 agreementId,
        bytes calldata agreementData,
        bytes calldata cbdata,
        bytes calldata ctx
    )
        external
        virtual
        override
        onlyHost
        returns(bytes memory newCtx)
    {
        if (!_isAccepted(superToken) || !_isCFAv1(agreementClass)) return ctx;
        (address sender,) = abi.decode(agreementData, (address, address));

        return _recoverToken(ctx, sender);
    }

    function _checkValidRent(bytes calldata ctx, address sender) internal view {
        bytes memory userData = _host.decodeCtx(ctx).userData;
        (uint256 tokenId, uint256 price) = abi.decode(userData, (uint256, uint256));
        
        require(_tokensInfo[tokenId] == address(0), "TokenNotAvailable");
        require(price > 0, "WrongValueSent");

        (uint256 startTime, int96 flowRate,,) = _cfa.getFlow(_cashToken, sender, ownerOf(tokenId));
        require(price >= uint256(flowRate), "BadPrice");
    }

    function _rentToken(
        bytes calldata ctx,
        address sender
    )
        internal
        returns (bytes memory newCtx)
    {
        bytes memory userData = _host.decodeCtx(ctx).userData;
        (uint256 tokenId, uint256 price) = abi.decode(userData, (uint256, uint256));
       
        address renter = ownerOf(tokenId);
        _tokenRents[sender].push(tokenId);
        _tokensInfo[tokenId] = renter;
        _transferForRent(renter, sender, tokenId);

        return _redirectSuperfluidAgreement(ctx, sender, renter);
    }

    function _redirectSuperfluidAgreement(bytes calldata ctx, address sender, address renter) internal returns (bytes memory newCtx) {

        int96 netFlowRate = _cfa.getNetFlow(_cashToken, address(this));
        (,int96 outFlowRate,,) = _cfa.getFlow(_cashToken, address(this), renter);
        int96 inFlowRate = netFlowRate + outFlowRate;

        if (inFlowRate == int96(0)) {
            // DELETE FLOW. WE ARE DOING THAT IN THE _removeSuperfluidAgreement function. Is it enought???? 
        } else if (outFlowRate != int96(0)){
            (newCtx, ) = _host.callAgreementWithContext(
                    _cfa,
                    abi.encodeWithSelector(
                        _cfa.updateFlow.selector,
                        _cashToken,
                        renter,
                        inFlowRate,
                        new bytes(0) // placeholder
                    ),
                    "0x",
                    ctx
                );
        } else {
            (newCtx, ) = _host.callAgreementWithContext(
                    _cfa,
                    abi.encodeWithSelector(
                        _cfa.createFlow.selector,
                        _cashToken,
                        renter,
                        inFlowRate,
                        new bytes(0) // placeholder
                    ),
                    "0x",
                    ctx
                );
        }
    }

    function _recoverToken(
        bytes calldata ctx,
        address sender
    )
        internal
        returns (bytes memory newCtx)
    {
        address originalOwner;
        uint256[] memory tokenIds = _tokenRents[sender];

        for (uint i=0; i<tokenIds.length; i++) {
            originalOwner = _tokensInfo[tokenIds[i]];
            _tokensInfo[tokenIds[i]] = address(0);
            _transferForRent(sender, originalOwner, tokenIds[i]);
        }

        delete _tokenRents[sender];

        return _removeSuperfluidAgreement(ctx, originalOwner);
    }

    function _removeSuperfluidAgreement(bytes calldata ctx, address renter) internal returns (bytes memory newCtx) {

        (newCtx, ) = _host.callAgreementWithContext(
                _cfa,
                abi.encodeWithSelector(
                    _cfa.deleteFlow.selector,
                    _cashToken,
                    address(this),
                    renter,
                    new bytes(0) // placeholder
                ),
                "0x",
                ctx
            );
    }

    function getRents() external view returns (uint256) {
        return _tokenRents[msg.sender].length;
    }

    function getRentInfoByTokenId(uint256 index) external view returns (uint256) {
        return _tokenRents[msg.sender][index];
    }

    function putForRent(uint256 _id, uint256 _price) external {
        require(ownerOf(_id) == msg.sender, "OnlyOwner");

        RentInfo memory tokenRent = RentInfo({
            id: _id,
            price: _price,
            owner: msg.sender
        });

        _rentingInfo.push(tokenRent);
    }

    function getRentList() external view returns (RentInfo[] memory) {
        return _rentingInfo;
    }

    // ERC721 functions
    function mint(uint256 _tokenId, string memory _metadata) external {
        _mint(msg.sender, uint256(_tokenId));
        _setTokenURI(_tokenId, _metadata);
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        require(_tokensInfo[tokenId] == address(0), "TokenRented");
        super._transfer(from, to, tokenId);
    }

    function _transferForRent(address from, address to, uint256 tokenId) internal override {
        super._transferForRent(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override {
        require(_tokensInfo[tokenId] == address(0), "TokenRented");
        super._burn(tokenId);
    }

    function approve(address to, uint256 tokenId) public override {
        require(_tokensInfo[tokenId] == address(0), "TokenRented");
        super.approve(to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        bool canPass = true;
        uint balance = balanceOf(msg.sender);
        for(uint i=0; i<balance; i++) {
            uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
            if (_tokensInfo[tokenId] != address(0)) {
                canPass = false; 
                break;
            }
        }
        
        require(canPass == true, "CantCallWithRentedTokens");

        super.setApprovalForAll(operator, approved);
    }

    /**
    * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
    */
    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        uint256 id = 0;
        assembly {
            id := chainid()
        }

        address proxyAddress = address(0);
        if (id == 1)
            proxyAddress = 0xa5409ec958C83C3f309868babACA7c86DCB077c1;
        else if (id == 4)
            proxyAddress = 0xF57B2c51dED3A29e6891aba85459d600256Cf317;

        require(proxyAddress == address(0), "NoAddress");
        if (proxyAddress != address(0)) {
            // Whitelist OpenSea proxy contract for easy trading.
            ProxyRegistry proxyRegistry = ProxyRegistry(proxyAddress);
            if (address(proxyRegistry.proxies(owner)) == operator) {
                return true;
            }
        }

        return super.isApprovedForAll(owner, operator);
    }

    function changeBaseUrl(string memory _baseUrl) external onlyOwner {
        _setBaseURI(_baseUrl);
    }
}