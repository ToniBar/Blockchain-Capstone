var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

var Web3 = require('web3');
var web3 = new Web3('ws://localhost:8546');

contract('SolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    const proof = 
    {
        "proof": {
            "a": ["0x1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033", "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0"],
            "b": [["0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560", "0x1535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc94"], ["0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a", "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d"]],
            "c": ["0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f", "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    };

    const key = "0xef1f2662d7292d792445fc2dd4bab33b81e3ed8e96235792a697987e02baccfb";

    describe('test solnSquareVerifier', function () {
        beforeEach(async function () { 

            let verifierContract = await Verifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: account_one});           
        })

        it('ERC721 token test', async function () { 
            // don't use call: it simulates so doesn't change state
            await this.contract.mintNFT(account_two, 5, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from:account_one}); 
            let tokenAddress = await this.contract.getTokenAddress(5, {from:account_one});
            
            // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
            assert.equal(tokenAddress, account_two, "Minting address error");
            

            // Test if a new solution can be added for contract - SolnSquareVerifier
            let tokenId = await this.contract.getSolutionTokenId(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs,{from: account_one});
            let sol_addr = await this.contract.getSolutionAddress(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs,{from: account_one});

            //assert.equal(addr, account_two, "Solution has incorrect address");
            assert.equal(tokenId, 5, "Incorrect token id");
            assert.equal(sol_addr, account_two, "Incorrect token owner address");
        })

    })


});




