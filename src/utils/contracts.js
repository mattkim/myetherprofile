import EtherProfileContract from '../../build/contracts/EtherProfile.json'
import getWeb3 from './getWeb3'

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


        // TODO: try and get the require working.
        if (res[0] === "0x0000000000000000000000000000000000000000") {
            return {
                name: "",
                imgurl: "",
                contact: "",
                aboutMe: "",
            }
        }

        return {
            name: res[2],
            imgurl: res[3],
            contact: res[4],
            aboutMe: res[5],
        };
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfile(
    fromAddress,
    name,
    imgurl,
    contact,
    aboutMe
) {
    try {
        const instance = await getEtherContractInstance();

        const res = await instance.updateProfile(
            name,
            imgurl,
            contact,
            aboutMe,
            {
                from: fromAddress,
            }
        );

        return {
            name,
            imgurl,
            contact,
            aboutMe,
        };
    } catch(err) {
        console.log(err);
    }

    return null;
}
