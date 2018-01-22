import EtherProfileContract from '../../build/contracts/EtherProfile.json'
import EtherProfileVersionsContract from '../../build/contracts/EtherProfileVersions.json'
import MigrationsContract from '../../build/contracts/Migrations.json'

import getWeb3 from './getWeb3'

const LATEST_PROFILE_VERSION = 0;

// 0: Olympic
// 1: Frontier, Homestead, Metropolis, the Ethereum public main network
// 1: Classic, the (un)forked public Ethereum Classic main network, chain ID 61
// 1: Expanse, an alternative Ethereum implementation, chain ID 2
// 2: Morden, the public Ethereum testnet, now Ethereum Classic testnet
// 3: Ropsten, the public cross-client Ethereum testnet
// 4: Rinkeby, the public Geth PoA testnet
// 42: Kovan, the public Parity PoA testnet
// 77: Sokol, the public Oracles PoA testnet
// 99: Core, the public Oracles PoA main network
// 7762959: Musicoin, the music blockchain
export const NETWORK_IDS = {
    0: "Olympic",
    1: "Main Ethereum Network",
    2: "Morden Test Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    42: "Kovan Test Network",
    77: "Sokol Test Oracle Network",
    99: "Core Main Oracle Network",
    7762959: "Musicoin Main Network",
};

export const ETHERSCAN_LINKS = {
    4: "https://rinkeby.etherscan.io",
};

export async function getWeb3js() {
    try {
        const results = await getWeb3;
        return results.web3;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getDefaultGasPrice(web3) {
    try{
        if(!web3) {
            web3 = await getWeb3js();
        }

        const res = await (() => {
            return new Promise(resolve => {
                web3.eth.getGasPrice((err, res) => {
                    resolve(res.toNumber());
                });
            });
        })();

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getNetworkId(web3) {
    try{
        if(!web3) {
            web3 = await getWeb3js();
        }

        return web3.version.network;
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

export async function getMigrations(web3) {
    try{
        if (!web3) {
            web3 = await getWeb3js();
        }

        const contract = require('truffle-contract')
        const migrations = contract(MigrationsContract)
        migrations.setProvider(web3.currentProvider)
        return migrations
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function getMigrationsInstance(web3) {
    try{
        if (!web3) {
            web3 = await getWeb3js();
        }

        const contract = require('truffle-contract')
        const migrations = contract(MigrationsContract)
        migrations.setProvider(web3.currentProvider)
        const instance = await migrations.deployed();
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
    gasPrice,
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

        const res = await instance.updateProfile(
            name,
            imgurl,
            email,
            aboutMe,
            {
                from: fromAddress,
                gasPrice,
            }
        );

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileName(fromAddress, gasPrice, name) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        const res = await instance.updateProfileName(
            name,
            {
                from: fromAddress,
                gasPrice,
            }
        );

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileImgurl(fromAddress, gasPrice, imgurl) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        const res = await instance.updateProfileImgurl(
            imgurl,
            {
                from: fromAddress,
                gasPrice,
            }
        );

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileEmail(fromAddress, gasPrice, email) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        const res = await instance.updateProfileEmail(
            email,
            {
                from: fromAddress,
                gasPrice,
            }
        );

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function updateEtherProfileAboutMe(fromAddress, gasPrice, aboutMe) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);

        const res = await instance.updateProfileAboutMe(
            aboutMe,
            {
                from: fromAddress,
                gasPrice,
            }
        );

        return res;
    } catch(err) {
        console.log(err);
    }

    return null;
}

// Estimates

export async function estimateUpdateEtherProfile(
    name,
    imgurl,
    email,
    aboutMe
) {
    try{
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        return instance.updateProfile.estimateGas(
            name,
            imgurl,
            email,
            aboutMe,
        );
    } catch (err) {
        console.log(err);
    }

    return null;
}

export async function estimateUpdateEtherProfileName(name) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        return instance.updateProfileName.estimateGas(name);
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function estimateUpdateEtherProfileImgurl(imgurl) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        return instance.updateProfileImgurl.estimateGas(imgurl);
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function estimateUpdateEtherProfileEmail(email) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        return instance.updateProfileEmail.estimateGas(email);
    } catch(err) {
        console.log(err);
    }

    return null;
}

export async function estimateUpdateEtherProfileAboutMe(aboutMe) {
    try {
        const web3 = await getWeb3js();
        const instance = await getEtherContractInstance(web3);
        return instance.updateProfileAboutMe.estimateGas(aboutMe);
    } catch(err) {
        console.log(err);
    }

    return null;
}