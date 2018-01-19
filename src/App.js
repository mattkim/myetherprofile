import React, { Component } from 'react'
import EtherProfileContract from '../build/contracts/EtherProfile.json'
import getWeb3 from './utils/getWeb3'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'; 

import {
  getNetworkId,
  getWeb3js,
  getEtherContractInstance,
  getEtherProfile
} from './utils/contracts';

import {
  setAccountCreated,
  setUser,
  updateCurrentAddress,
  updateEtherProfileInstance,
  updateNetworkId,
  updateWeb3,
} from './actions'

import Home from './Home'
import Header from './Header'
import Profile from './Profile'
import Me from './Me'
import Footer from './Footer'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  static propTypes = {
    updateCurrentAddress: React.PropTypes.func,
    updateEtherProfileInstance: React.PropTypes.func,
    updateNetworkId: React.PropTypes.func,
    updateWeb3: React.PropTypes.func,
    setAccountCreated: React.PropTypes.func,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.instantiateContract();
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const web3 = await getWeb3js();
    const networkId = await getNetworkId(web3);
    this.props.updateNetworkId(networkId);

    let currentAddress;

    web3.eth.getAccounts((error, accounts) => {
      currentAddress = accounts[0];
      this.props.updateCurrentAddress(currentAddress)
    });
    
    const instance = await getEtherContractInstance(web3);
    const profile = await getEtherProfile(currentAddress, instance);
    this.props.setUser(profile);
  }

  render() {
    return (
      <div style={{background: "#102138", height:"100vh"}}>
        <div style={{background: "white"}}>
          <Header {...this.props}/>
          <Route exact path="/" render={(props) => (<Me {...props}/>)}/>
          <Route path="/profile/:address" render={(props) => (<Profile {...props}/>)}/>
        </div>
        <Footer {...this.props}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentAddress: address => {
      dispatch(updateCurrentAddress(address))
    },
    updateEtherProfileInstance: address => {
      dispatch(updateEtherProfileInstance(address))
    },
    updateNetworkId: networkId => {
      dispatch(updateNetworkId(networkId))
    },
    updateWeb3: web3 => {
      dispatch(updateWeb3(web3))
    },
    setAccountCreated: accountCreated => {
      dispatch(setAccountCreated(accountCreated))
    },
    setUser: user => {
      dispatch(setUser(user))
    }
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
