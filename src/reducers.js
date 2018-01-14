import { combineReducers } from 'redux'

import {
    UPDATE_CURRENT_ADDRESS,
    UPDATE_USER_ADDRESS,
    UPDATE_WEB3,
    UPDATE_ETHER_PROFILE_INSTANCE,
  } from './actions'

function user(state = {}, action) {
    switch(action.type) {
        case UPDATE_USER_ADDRESS:
            return {
                ...state,
                address: action.address,
            };
        default:
            return state;
    }
}

function core(state = {}, action) {
  switch (action.type) {
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
    default:
      return state
  }
}

export const reducers = combineReducers({
  user,
  core,
});
