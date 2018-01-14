/*
 * action types
 */

export const SET_ACCOUNT_CREATED = 'SET_ACCOUNT_CREATED'
export const SET_USER = 'SET_USER'
export const UPDATE_CURRENT_ADDRESS = 'UPDATE_CURRENT_ADDRESS'
export const UPDATE_WEB3 = 'UPDATE_WEB3'
export const UPDATE_ETHER_PROFILE_INSTANCE = 'UPDATE_ETHER_PROFILE_INSTANCE'

/*
 * action creators
 */

export function setAccountCreated(accountCreated) {
    return { type: SET_ACCOUNT_CREATED, accountCreated };
}

export function setUser(user) {
    return { type: SET_USER, user };
}

export function updateCurrentAddress(address) {
    return {type: UPDATE_CURRENT_ADDRESS, address };
}

export function updateWeb3(web3) {
    return {type: UPDATE_WEB3, web3};
}

export function updateEtherProfileInstance(instance) {
    return {type: UPDATE_ETHER_PROFILE_INSTANCE, instance};
}