/*
 * action types
 */

export const UPDATE_CURRENT_ADDRESS = 'UPDATE_CURRENT_ADDRESS'
export const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS'
export const UPDATE_WEB3 = 'UPDATE_WEB3'
export const UPDATE_ETHER_PROFILE_INSTANCE = 'UPDATE_ETHER_PROFILE_INSTANCE'

/*
 * action creators
 */

export function updateCurrentAddress(address) {
    return {type: UPDATE_CURRENT_ADDRESS, address };
}

export function updateUserAddress(address) {
    return {type: UPDATE_USER_ADDRESS, address};
}
  
export function updateWeb3(web3) {
    return {type: UPDATE_WEB3, web3};
}

export function updateEtherProfileInstance(instance) {
    return {type: UPDATE_ETHER_PROFILE_INSTANCE, instance};
}