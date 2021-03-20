const { assert } = require('chai')
const NFTDefiFactory = artifacts.require('./NFTDefiFactory.sol')
const ERC20Reward = artifacts.require("./ERC20Reward.sol");

require('chai')
    .use(require('chai-as-promised'))
    .should()

    contract('NFTDefiFactory', (accounts) => {
        let factory = ''
        let erc20 = ''
    
        before(async () => {
            factory = await NFTDefiFactory.deployed()
            erc20 = await ERC20Reward.deployed()
        })
    
        describe('deployment', async () => {
            it('deploys successfully', async () => {
                const address = factory.address
                assert.notEqual(address, 0x0)
                assert.notEqual(address, '')
                assert.notEqual(address, null)
                assert.notEqual(address, undefined)
            })
        })
    
        describe('factory functionality', async () => {
            it('create a new NFTDefi token', async () => {
                const result = await factory.createNFTDefiToken('TEST', 'TES', 'https://', erc20.address)
                const event = result.logs[1].args
                assert.isNotEmpty(event.tokenAddress)
            })
        })
    })