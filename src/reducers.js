import { combineReducers } from 'redux'

import {
    SET_ACCOUNT_CREATED,
    SET_USER,
    UPDATE_CURRENT_ADDRESS,
    UPDATE_WEB3,
    UPDATE_ETHER_PROFILE_INSTANCE,
    UPDATE_NETWORK_ID,
  } from './actions'

function user(state = {}, action) {
    switch(action.type) {
        case SET_USER:
          return {
            ...action.user
          };
        default:
          return state;
    }
}

function core(state = {}, action) {
  switch (action.type) {
    case SET_ACCOUNT_CREATED:
      return {
        ...state,
        accountCreated: action.accountCreated,
      }
    case UPDATE_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: action.address,
      };
    case UPDATE_WEB3:
      return {
        ...state,
        web3: action.web3,
      };
    case UPDATE_ETHER_PROFILE_INSTANCE:
      return {
        ...state,
        etherProfileInstance: action.instance,
      };
    case UPDATE_NETWORK_ID:
      return {
        ...state,
        networkId: action.networkId,
      };
    default:
      return state
  }
}

export const reducers = combineReducers({
  user,
  core,
});
