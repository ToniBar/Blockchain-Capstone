var ERC721MintableComplete = artifacts.require('RealEstateToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            let tokenId = 0;

            for(var i = 2; i < 10; i++){
                this.contract.mint(accounts[i], tokenId++, "");
            }
        })

        it('should return total supply', async function () { 
            var supply = await this.contract.totalSupply();
            assert.equal(supply, 8, "Wrong total supply");
        })

        it('should get token balance', async function () { 
            var balance = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance, 0, "Balance should be 0");

            balance = await this.contract.balanceOf(accounts[2]);
            assert.equal(balance, 1, "Balance should be 1");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var token_uri = this.contract.tokenURI(0, {from: account_one});
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0", "Wrong token uri") 
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract._transferFrom(accounts[2], accounts[12], 0, {from:accounts[2]});
            var t_owner = await this.contract.ownerOf(0);

            assert.equal(t_owner, accounts[12], "Incorrect token transfer");

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let err = 0;
            try{
                await this.contract.mint(accounts[11], 10, "", {from: accounts[20]});
            }
            catch(r){
                err++;
            }

            assert.equal(r, 1, "Toked minted by invaled account");
        })

        it('should return contract owner', async function () { 
            var c_owner = await this.contract.getOwner();

            assert.equal(c_owner, account_one, "Incorrect contract owner");
        })

    });
})