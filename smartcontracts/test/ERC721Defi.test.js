const { assert } = require('chai')
const ERC721Defi = artifacts.require('./ERC721Defi.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

    contract('NFTDefi', (accounts) => {
        let nftDefiToken = ''
        let privateKey = '37535a2ad2232fc3f7b28ce86c09ad2af6ac01e89757328f2f82013b330402e2'
        let loanDate = Math.floor(Date.now() / 1000) + (1*24*3600)
    
        before(async () => {
            nftDefiToken = await ERC721Defi.deployed()
        })
    
        describe('deployment', async () => {
            it('deploys successfully', async () => {
                const address = nftDefiToken.address
                assert.notEqual(address, 0x0)
                assert.notEqual(address, '')
                assert.notEqual(address, null)
                assert.notEqual(address, undefined)
            })
    
            it('has a name', async () => {
                const name = await nftDefiToken.name()
                assert.equal(name, 'ERC721Defi')
            })
    
            it('has a symbol', async () => {
                const symbol = await nftDefiToken.symbol()
                assert.equal(symbol, 'NFD')
            })
    
            it('has an url', async () => {
                const baseURI = await nftDefiToken.baseURI()
                assert.equal(baseURI, 'https://example.com/api/')
            })

            it('has an owner', async () => {
                const owner = await nftDefiToken.owner()
                assert.equal(owner, accounts[0])
            })
        })
    
        describe('token minting', async () => {
            it('mint a new token', async () => {
                await nftDefiToken.mint(1).should.be.fulfilled
                await nftDefiToken.mint(2).should.be.fulfilled
            })

            it('batch mint new tokens', async () => {
                await nftDefiToken.batchMint([3,4,5]).should.be.fulfilled;
                await nftDefiToken.transferFrom(accounts[0], accounts[1], 3).should.be.fulfilled
                await nftDefiToken.transferFrom(accounts[0], accounts[1], 4).should.be.fulfilled
                await nftDefiToken.transferFrom(accounts[0], accounts[1], 5).should.be.fulfilled
            })
        })

        describe('token rent', async () => {
            let vv, rr, ss = ''

            it('put a token up for rent', async () => {
                let nonce = await nftDefiToken.getNonceRent()
                let messageToSign = nftDefiToken.address.toLowerCase() + ". Ids: 1,. price: " + web3.utils.toWei('1') + ". nonce: " + nonce.toString()
                const {signature, messageHash, v, r, s} = await web3.eth.accounts.sign(messageToSign, privateKey)
                assert.notEqual(messageHash, 0x0)
                assert.notEqual(messageHash, '')
                assert.notEqual(messageHash, null)
                assert.notEqual(messageHash, undefined)

                vv = v
                rr = r
                ss = s
            })

            it('rent a token', async () => {
                let amount = '0.00027'
                let ownerBefore = await nftDefiToken.ownerOf(1)
                let nonce = await nftDefiToken.getNonceRent()
                await nftDefiToken.rent([1], web3.utils.toWei('1'), nonce, {v: vv, r: rr, s: ss}, { from: accounts[1], value: web3.utils.toWei(amount) }).should.be.fulfilled
                await new Promise(r => setTimeout(r, 2000))
                let ownerAfter = await nftDefiToken.ownerOf(1)
                assert.notEqual(ownerBefore, ownerAfter)
                await nftDefiToken.rent([1], web3.utils.toWei('1'), nonce, {v: vv, r: rr, s: ss}, { from: accounts[1], value: web3.utils.toWei(amount) }).should.be.rejected;
            })

            it('recover a token', async () => {
                let ownerBefore = await nftDefiToken.ownerOf(1)
                let rentsNumber = await nftDefiToken.getRents()
                assert.equal(rentsNumber, 1);
                
                await nftDefiToken.recover(rentsNumber-1).should.be.fulfilled

                let ownerAfter = await nftDefiToken.ownerOf(1)
                assert.notEqual(ownerBefore, ownerAfter)
            })

            it('cancel a rent', async () => {
                let nonce = await nftDefiToken.getNonceRent()
                await nftDefiToken.cancelRent(nonce).should.be.fulfilled
                await nftDefiToken.cancelRent(nonce).should.be.rejected
            })
        })

        describe('token swap', async () => {
            let vv, rr, ss = ''

            it('setup a token swap', async () => {
                let nonce = await nftDefiToken.getNonceSwap()
                let messageToSign = nftDefiToken.address.toLowerCase() + ". fromIds: 1,2,. toIds: 3,4,5,. fromOwner: " + accounts[0].toLowerCase() + ". nonce: " + nonce.toString()

                const {signature, messageHash, v, r, s} = await web3.eth.accounts.sign(messageToSign, privateKey)
                assert.notEqual(messageHash, 0x0)
                assert.notEqual(messageHash, '')
                assert.notEqual(messageHash, null)
                assert.notEqual(messageHash, undefined)

                vv = v
                rr = r
                ss = s
            })

            it ('swap tokens', async () => {
                let ownerBefore1 = await nftDefiToken.ownerOf(1)
                let ownerBefore2 = await nftDefiToken.ownerOf(2)
                let ownerBefore3 = await nftDefiToken.ownerOf(3)
                let ownerBefore4 = await nftDefiToken.ownerOf(4)
                let ownerBefore5 = await nftDefiToken.ownerOf(5)

                let nonce = await nftDefiToken.getNonceSwap()
                await nftDefiToken.swap([1,2], [3,4,5], accounts[0].toLowerCase(), nonce, {v: vv, r: rr, s: ss}, { from: accounts[1] }).should.be.fulfilled

                let ownerAfter1 = await nftDefiToken.ownerOf(1)
                let ownerAfter2 = await nftDefiToken.ownerOf(2)
                let ownerAfter3 = await nftDefiToken.ownerOf(3)
                let ownerAfter4 = await nftDefiToken.ownerOf(4)
                let ownerAfter5 = await nftDefiToken.ownerOf(5)

                assert.notEqual(ownerBefore1, ownerAfter1)
                assert.notEqual(ownerBefore2, ownerAfter2)
                assert.notEqual(ownerBefore3, ownerAfter3)
                assert.notEqual(ownerBefore4, ownerAfter4)
                assert.notEqual(ownerBefore5, ownerAfter5)
            })

            it('cancel an swap', async () => {
                let nonce = await nftDefiToken.getNonceSwap()
                await nftDefiToken.cancelSwap(nonce).should.be.fulfilled
                await nftDefiToken.cancelSwap(nonce).should.be.rejected
            })
        })

        describe('Get a loan with a token', async () => {
            let vv, rr, ss = ''

            it('setup the token loan', async () => {
                await nftDefiToken.transferFrom(accounts[1], accounts[0], 1, { from: accounts[1] }).should.be.fulfilled
                await nftDefiToken.transferFrom(accounts[1], accounts[0], 2, { from: accounts[1] }).should.be.fulfilled
                let nonce = await nftDefiToken.getNonceLoan()
                let messageToSign = nftDefiToken.address.toLowerCase() + ". Ids: 1,2,. price: " + web3.utils.toWei('1.1') + ". expires: " + loanDate + ". nonce: " + nonce.toString()

                const {signature, messageHash, v, r, s} = await web3.eth.accounts.sign(messageToSign, privateKey)
                assert.notEqual(messageHash, 0x0)
                assert.notEqual(messageHash, '')
                assert.notEqual(messageHash, null)
                assert.notEqual(messageHash, undefined)

                vv = v
                rr = r
                ss = s
            })

            it ('formalize the loan', async () => {
                // Gas: 493062
                let nonce = await nftDefiToken.getNonceLoan()
                await nftDefiToken.loan([1,2], web3.utils.toWei('1.1'), loanDate, nonce, {v: vv, r: rr, s: ss}, { from: accounts[1], value: web3.utils.toWei('1') }).should.be.fulfilled
            })

            it ('repay the loan', async () => {
                // Gas: 131875
                let loansNumber = await nftDefiToken.getLoans()
                assert.equal(loansNumber, 1)
                
                await nftDefiToken.repayLoan(loansNumber-1, { from: accounts[0], value: web3.utils.toWei('1.1') }).should.be.fulfilled

                // TODO. Check balances
            })

            it('cancel a loan', async () => {
                // Gas: 28449
                let nonce = await nftDefiToken.getNonceLoan()
                await nftDefiToken.cancelLoan(nonce).should.be.fulfilled;
                await nftDefiToken.cancelLoan(nonce).should.be.rejected;
            })
        })
    })