import EtherProfileContract from '../../build/contracts/EtherProfile.json'
import EtherProfileVersionsContract from '../../build/contracts/EtherProfileVersions.json'
import getWeb3 from './getWeb3'

const LATEST_PROFILE_VERSION = 0;

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

        return {
            name: res[0],
            imgurl: res[1],
            email: res[2],
            aboutMe: res[3],
        };
    } catch (err) {
        console.log(err);
    }

    return null;
}

// TODO: look into limiting cost of updates
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
        
        // TODO: instead ask users to upgrade to next version, and show contract.
        // const versions = await getEtherProfileVersionsInstance(web3);
        // const version = await versions.getProfileVersion(fromAddress);
        // if (version.toNumber() < LATEST_PROFILE_VERSION) {
        //     console.log("***** updateEtherProfile");
        //     console.log(version.toNumber());
        //     await versions.updateProfileVersion(
        //         fromAddress,
        //         LATEST_PROFILE_VERSION,
        //         {
        //             from: fromAddress
        //         }
        //     );
        // }

        await instance.updateProfile(
            name,
            imgurl,
            email,
            aboutMe,
            {
                from: fromAddress,
            }
        );

        return {
            name,
            imgurl,
            email,
            aboutMe,
        };
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileName(fromAddress, name) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        await instance.updateProfileName(
            name,
            {
                from: fromAddress,
            }
        );

        return name;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileImgurl(fromAddress, imgurl) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        await instance.updateProfileImgurl(
            imgurl,
            {
                from: fromAddress,
            }
        );

        return imgurl;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileEmail(fromAddress, email) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        await instance.updateProfileEmail(
            email,
            {
                from: fromAddress,
            }
        );

        return email;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileAboutMe(fromAddress, aboutMe) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        await instance.updateProfileAboutMe(
            aboutMe,
            {
                from: fromAddress,
            }
        );

        return aboutMe;
    } catch(err) {
        console.log(err);
    }

    return null;
}
