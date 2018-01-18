pragma solidity ^0.4.18;

// Holds a contract of all profiles that can be updated.
contract EtherProfileVersions {
    address owner;

    // For backfills if needed later
    address[] ids;
    mapping(address => uint256) addressToId;

    // Version for ether profile contract.
    mapping(address => uint256) addressToProfileVersion;

    function EtherProfileVersions() public {
        owner = msg.sender;
    }

    function updateProfileVersion(address _address, uint256 version) public {
        if (addressToId[_address] <= 0) {
            uint256 newId = ids.length++;
            ids[newId] = _address;
            addressToId[_address] = newId;
        }

        addressToProfileVersion[_address] = version;
    }

    function getProfileVersion(address _address) public view returns(uint256) {
        return addressToProfileVersion[_address];
    }
}
