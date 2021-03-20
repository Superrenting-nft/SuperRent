var NFTDefiFactory = artifacts.require("./NFTDefiFactory.sol");
var DaiToken = artifacts.require("./DaiToken.sol");
var ERC721Defi = artifacts.require("./ERC721Defi.sol");

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { setWeb3Provider } = require("@decentral.ee/web3-helpers/src/config");
const { toWad, wad4human } = require("@decentral.ee/web3-helpers");

const fs = require('fs');

async function doDeploy(deployer, network, accounts) {

    console.log('****** INIT SUPERFLUID NFT DEPLOYMENT ******');
    bob = accounts[0];
    alice = accounts[1];

    console.log('--> BOB Address: ', bob);
    console.log('--> ALICE Address: ', alice);

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


    // 3. Mint a new NFT
    let erc721 = await ERC721Defi.at(event.tokenAddress);
    let metadata = '{"name": "first nft", "description: "this is our first nft", "image": "https://ipfs.io/ipfs/QmdJmFhB84vpP8tVb3ybTtHToX2VAkXJRoaQZr2c8h64GH" }';
    await erc721.mint(1, metadata, { from: bob });
    console.log('--> MINTED NFT WITH ID 1');

    // 4. Put the NFT for rent
    await erc721.putForRent(1, 277777777777778);    // Put for rent for 1 DAIx per hour

    let ownerBefore = await erc721.ownerOf(1);
    console.log('--> NFT ID 1 OWNER BEFORE RENTING: ', ownerBefore);

    balanceBob = await daix.balanceOf(bob);
    console.log('--> SUPERFLUID DAIx BALANCE BOB:', balanceBob.toString());
    balanceAlice = await daix.balanceOf(alice);
    console.log('--> SUPERFLUID DAIx BALANCE ALICE:', balanceAlice.toString());

    // 5. Create a new flow with Superfluid to rent the NFT
    await sf.cfa.createFlow({
        superToken: daix.address,
        sender: alice,
        receiver: event.tokenAddress,
        flowRate: "277777777777778",
        userData: web3.eth.abi.encodeParameters(['uint256', 'uint256'], [1, 277777777777778])
    });

    console.log('--> SUPERFLUID FLOW CREATED. NFT ID 1 RENTED');

    await new Promise(r => setTimeout(r, 2000));

    let ownerAfter = await erc721.ownerOf(1);
    console.log('--> NFT ID 1 OWNER AFTER RENTING: ', ownerAfter);

    await new Promise(r => setTimeout(r, 60000));   // We wait a minute to get some DAIx in the flow

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

    balanceBob = await daix.balanceOf(bob);
    console.log('--> SUPERFLUID DAIx BALANCE BOB:', balanceBob.toString());
    balanceAlice = await daix.balanceOf(alice);
    console.log('--> SUPERFLUID DAIx BALANCE ALICE:', balanceAlice.toString());

}

module.exports = function(deployer, network, accounts) {
    deployer.then(async () => {
        await doDeploy(deployer, network, accounts);
    });
};
