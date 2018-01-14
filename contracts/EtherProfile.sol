pragma solidity ^0.4.18;

// Holds a contract of all profiles that can be updated.
contract EtherProfile {
    address owner;
    uint256 public numAccounts = 0;

    Profile[] profiles;
    mapping(address => uint256) addressToProfileId;

    struct Profile {
        address addr;
        uint256 id;
        string name;
        string imgURL;
        string contact;
        string aboutMe;
    }

    event UpdateProfile(address addr);
    
    function EtherProfile() public {
        owner = msg.sender;
    }

    function getProfile(address _address) public view returns(
        address,
        uint256,
        string,
        string,
        string,
        string
    ) {
        uint256 id = addressToProfileId[_address];
        // TODO: we should be able to catch a require here.
        if (id <= 0) {
            return (
                0x0000000000000000000000000000000000000000,
                0,
                "failure",
                "failure",
                "failure",
                "failure"
            );
        }

        return (
            profiles[id].addr,
            profiles[id].id,
            profiles[id].name,
            profiles[id].imgURL,
            profiles[id].contact,
            profiles[id].aboutMe
        );
    }

    // Simple for now because params are not optional
    function updateProfile(
        string name,
        string imgURL,
        string contact,
        string aboutMe
    ) public returns (uint256)
    {
        address _address = msg.sender;
        
        uint256 id = addressToProfileId[_address];

        if (id <= 0) {
            id = createProfile(_address);
        }

        profiles[id].name = name;
        profiles[id].imgURL = imgURL;
        profiles[id].contact = contact;
        profiles[id].aboutMe = aboutMe;

        return id;
    }

    function createProfile(address _address) private returns(uint256) {
        uint256 id = profiles.length++;
        addressToProfileId[_address] = id;
        Profile storage p = profiles[id];
        p.addr = _address;
        p.id = id;
        return id;
    }
}