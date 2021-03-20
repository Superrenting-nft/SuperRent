var NFTDefiFactory = artifacts.require("./NFTDefiFactory.sol");
var DaiToken = artifacts.require("./DaiToken.sol");
var ERC721Defi = artifacts.require("./ERC721Defi.sol");

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { setWeb3Provider } = require("@decentral.ee/web3-helpers/src/config");
const { toWad, wad4human } = require("@decentral.ee/web3-helpers");

const fs = require('fs');

async function doDeploy(deployer, network, accounts) {

    console.log('****** INIT SUPERFLUID NFT DEPLOYMENT ******');
    bob = '0xeA4ca1270Cc91aC072c3b1d273dA95Ce8d024fB5';
    alice = '0x014b5734E611dAf1303F199377d3FDC682c87b20';

    console.log('--> BOB Address: ', bob);
    console.log('--> ALICE Address: ', alice);

    const privatekey = fs.readFileSync(".privatekey").toString().trim();
    const version = "v1";
    setWeb3Provider(web3.currentProvider);

    const sf = new SuperfluidSDK.Framework({
        web3,
        version,
        tokens: ["fDAI"]
    });

    await sf.initialize();


    const dai = await DaiToken.at(sf.tokens.fDAI.address);
    const daix = sf.tokens.fDAIx;
    /*
    console.log('DAI Address: ', sf.tokens.fDAI.address);
    console.log('DAIx Address: ', sf.tokens.fDAIx.address);
  
    console.log('--> Minting 100 DAI por Alice');
    await dai.mint(alice, web3.utils.toWei("100"));
    await dai.approve(daix.address, web3.utils.toWei("100"), { from: alice });
    await daix.upgrade(web3.utils.toWei("50"), { from: alice });
    console.log('--> Approving 50 DAIx por Alice');
    */
    // 1. Deploy the NFTFactory contract
    await deployer.deploy(NFTDefiFactory);
    let nftFactory = await NFTDefiFactory.deployed();
    console.log('--> Superfluid NFTFactory deployed:', nftFactory.address);

    // 2. Create an new ERC721 contract
    let result = await nftFactory.createNFTDefiToken("RENTNFT", "NFT",
                                                    sf.tokens.fDAIx.address,
                                                    sf.host.address,
                                                    sf.agreements.cfa.address
                                                    );

    const event = result.logs[0].args;
    console.log('--> ERC721 Token address:', event.tokenAddress);                                     


    // 3. Mint 2 new NFTs
    let erc721 = await ERC721Defi.at(event.tokenAddress);
    let metadata = '{"name": "first nft", "description: "this is our first nft", "image": "https://ipfs.io/ipfs/QmdJmFhB84vpP8tVb3ybTtHToX2VAkXJRoaQZr2c8h64GH" }';
    await erc721.mint(1, metadata, { from: bob });
    console.log('--> MINTED NFT WITH ID 1');
    await erc721.mint(2, "", { from: bob });
    console.log('--> MINTED NFT WITH ID 2');

    // 4. Create a gas-less rent post
    // 1 DAIx per hour are 277777777777778????
    let messageToSign = erc721.address.toLowerCase() + ". Ids: 1,. price: " + web3.utils.toWei('1') + ". nonce: 1";
    console.log('RENT MESSAGE TO SIGN FROM CLIENT: ', messageToSign);
    let {signature, messageHash, v, r, s} = await web3.eth.accounts.sign(messageToSign, privatekey);
    console.log('SIGNATURE: ', signature);
    console.log('MESSAGE HASH: ', messageHash);
    console.log('V: ', v);
    console.log('R: ', r);
    console.log('S: ', s);

    let ownerBefore = await erc721.ownerOf(1);
    console.log('--> NFT ID 1 OWNER BEFORE RENTING: ', ownerBefore);

    // 5. Create a new flow with Superfluid to rent a token
    await sf.cfa.createFlow({
        superToken: daix.address,
        sender: alice,
        receiver: event.tokenAddress,
        flowRate: "1000000000000000",
        userData: web3.eth.abi.encodeParameters(['uint256[]', 'uint256', 'uint32', 'uint8', 'bytes32', 'bytes32'], [[1], web3.utils.toWei("1"), 1, v, r, s])
    });

    console.log('--> SUPERFLUID FLOW CREATED. NFT ID 1 RENTED');

    await new Promise(r => setTimeout(r, 2000));

    let ownerAfter = await erc721.ownerOf(1);
    console.log('--> NFT ID 1 OWNER AFTER RENTING: ', ownerAfter);

    // NOT WORKING
    let flowAliceToBob = (await sf.cfa.getFlow({superToken: daix.address, sender: alice, receiver: bob})).toString();
    (async () => wad4human(flowAliceToBob))();
    console.log('--> Flow debug Alice to Bob:', flowAliceToBob.toString());

    balanceBob = await sf.cfa.getNetFlow({superToken: daix.address, account: bob});
    console.log('--> SUPERFLUID DAIx BALANCE BOB:', balanceBob.toString());
    balanceAlice = await sf.cfa.getNetFlow({superToken: daix.address, account: alice});
    console.log('--> SUPERFLUID DAIx BALANCE ALICE:', balanceAlice.toString());

    await new Promise(r => setTimeout(r, 60000));

    // 6. Finish the rent (and the flow)
    await sf.cfa.deleteFlow({
        superToken: daix.address,
        sender: alice,
        receiver: event.tokenAddress,
        by: alice
    });

    await new Promise(r => setTimeout(r, 2000));

    ownerAfter = await erc721.ownerOf(1);
    console.log('--> NFT ID 1 OWNER AFTER RENTING FINISHED: ', ownerAfter);
    ownerAfter = await erc721.ownerOf(2);
    console.log('--> NFT ID 2 OWNER AFTER RENTING FINISHED: ', ownerAfter);

    balanceBob = await sf.cfa.getNetFlow({superToken: daix.address, account: bob});
    console.log('--> SUPERFLUID DAIx BALANCE BOB:', balanceBob.toString());
    balanceAlice = await sf.cfa.getNetFlow({superToken: daix.address, account: alice});
    console.log('--> SUPERFLUID DAIx BALANCE ALICE:', balanceAlice.toString());

}

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};
