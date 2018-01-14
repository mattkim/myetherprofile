pragma solidity ^0.4.18;

// Holds a contract of all profiles that can be updated.
contract EtherProfile {
    address owner;
    uint256 public numAccounts = 0;

    Profile[] profiles;
    mapping(address => uint256) addressToProfileId;

    struct Profile {
        address addr;
        uint id;
        string name;
        string imgURL;
        string contact;
        string aboutMe;
    }

    event UpdateProfile(address addr);
    
    function EtherProfile() public {
        owner = msg.sender;
    }

    // function getProfile(address _address) public constant returns(
    //     address,
    //     string,
    //     string,
    //     string,
    //     string
    // ) {
    //     Profile storage profile = profiles[addressToProfileId[_address]];
    //     return (
    //         profile.addr,
    //         profile.name,
    //         profile.imgURL,
    //         profile.contact,
    //         profile.aboutMe
    //     );
    // }

    function getProfile(address _address) public view returns(
        string
    ) {
        uint256 id = addressToProfileId[_address];
        require(id > 0);
        return profiles[id].name;
    }

    function createProfile(address _address) private returns(uint256) {
        uint256 id = profiles.length++;
        addressToProfileId[_address] = id;
        Profile storage p = profiles[id];
        p.addr = _address;
        p.id = id;
        return id;
    }

    // Simple for now because params are not optional
    function updateProfile(
        string name,
        string imgURL,
        string contact,
        string aboutMe
    ) public
    {
        Profile storage profile = profiles[addressToProfileId[msg.sender]];
        profile.name = name;
        profile.imgURL = imgURL;
        profile.contact = contact;
        profile.aboutMe = aboutMe;
    }
}