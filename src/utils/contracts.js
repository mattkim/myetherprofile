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

export async function getEtherProfile(address) {
    try{
        const results = await getWeb3;
        const contract = require('truffle-contract')
        const etherProfile = contract(EtherProfileContract)
        etherProfile.setProvider(results.web3.currentProvider)
        const instance = await etherProfile.deployed();
        const res = await instance.getProfile(address);

        console.log("****** getEtherProfile result");
        console.log(res);

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