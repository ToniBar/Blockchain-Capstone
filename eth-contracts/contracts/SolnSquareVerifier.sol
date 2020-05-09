pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is RealEstateToken{
    // TODO define a solutions struct that can hold an index & an address
    struct solutions
    {
        uint256 index;
        address addr;
    }

    // TODO define an array of the above struct
    solutions[] private Solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => solutions) internal Usolutions;
    mapping(uint256 => address) internal Tokens;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address addr, bytes32 key);

    Verifier verifierContract;
    constructor(address verifierContractAddress) public
    {
         verifierContract = Verifier(verifierContractAddress);
    }

    function getTokenAddress(uint256 id) public view returns(address)
    {
        return Tokens[id];
    }

    function getSolutionTokenId(uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) public view returns(uint256)
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        return Usolutions[key].index;
    }

    function getSolutionAddress(uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) public view returns(address)
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        return Usolutions[key].addr;
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 ind, address add, bytes32 key) internal{
        solutions memory s = solutions({index:ind, addr:add});
        Solutions.push(s);
        Usolutions[key] = s;
        Tokens[ind] = add;

        emit SolutionAdded(ind, add, key);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, uint256 tokenId, uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) public
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

        require(Usolutions[key].addr == address(0), "Solution has been used before");
        require(verifierContract.verifyTx(a, b, c, input), "Invalid solution");

        addSolution(tokenId, to, key);

        super.mint(to, tokenId);
    }

}


























