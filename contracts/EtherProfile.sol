pragma solidity ^0.4.18;

// Holds a contract of all profiles that can be updated.
contract EtherProfile {
    address owner;

    mapping(address => string) addressToData;

    function EtherProfile() public {
        owner = msg.sender;
    }

    function getProfile(address _address) public view returns(
        string
    ) {
        return addressToData[_address];
    }

    // Simple for now because params are not optional
    function updateProfile(string data) public {
        address _address = msg.sender;
        addressToData[_address] = data;
    }
}