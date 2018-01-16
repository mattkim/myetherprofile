import EtherProfileContract from '../../build/contracts/EtherProfile.json'
import EtherProfileVersionsContract from '../../build/contracts/EtherProfileVersions.json'
import getWeb3 from './getWeb3'

const LATEST_PROFILE_VERSION = 1;

export function simple(address) {
    console.log("**** simple");
    console.log(address);
    getWeb3.then(results => {
        console.log("**** simple web3");
        console.log(results);
        console.log(results.web3);
    });
}

export async function getWeb3js() {
    try {
        const results = await getWeb3;
        return results.web3;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getEtherProfileVersionsInstance(web3) {
    try{
        if (!web3) {
            web3 = await getWeb3js();
        }

        const contract = require('truffle-contract')
        const etherProfileVersions = contract(EtherProfileVersionsContract)
        etherProfileVersions.setProvider(web3.currentProvider)
        const instance = await etherProfileVersions.deployed();
        return instance;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getEtherContractInstance(web3) {
    try{
        if (!web3) {
            web3 = await getWeb3js();
        }

        const contract = require('truffle-contract')
        const etherProfile = contract(EtherProfileContract)
        etherProfile.setProvider(web3.currentProvider)
        const instance = await etherProfile.deployed();
        return instance;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getEtherProfile(address, instance) {
    try{
        if(!instance) {
            instance = await getEtherContractInstance();
        }

        const res = await instance.getProfile(address);

        // TODO: what is the value when it is null?  ""?
        // TODO: try and get the require working.
        if (res === "") {
            return {
                name: "",
                imgurl: "",
                email: "",
                aboutMe: "",
            }
        }

        return JSON.parse(res);
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfile(
    fromAddress,
    name,
    imgurl,
    email,
    aboutMe
) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        const versions = await getEtherProfileVersionsInstance(web3);
        const version = await versions.getProfileVersion(fromAddress);

        if (version.toNumber() < LATEST_PROFILE_VERSION) {
            await versions.updateProfileVersion(
                fromAddress,
                LATEST_PROFILE_VERSION,
                {
                    from: fromAddress
                }
            );
        }
        
        const profile = {
            name,
            imgurl,
            email,
            aboutMe,
        };

        await instance.updateProfile(
            JSON.stringify(profile),
            {
                from: fromAddress,
            }
        );

        return profile;
    } catch(err) {
        console.log(err);
    }

    return null;
}
