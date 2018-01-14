import React, { Component } from 'react'
import EtherProfileContract from '../build/contracts/EtherProfile.json'
import getWeb3 from './utils/getWeb3'
import { connect } from 'react-redux'

import {
  updateCurrentAddress,
  updateEtherProfileInstance,
  updateUserAddress,
  updateWeb3,
} from './actions'


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  static propTypes = {
    updateCurrentAddress: React.PropTypes.func,
    updateEtherProfileInstance: React.PropTypes.func,
    updateUserAddress: React.PropTypes.func,
    updateWeb3: React.PropTypes.func,
  };

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      this.props.updateWeb3(results.web3);

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const etherProfile = contract(EtherProfileContract)
    etherProfile.setProvider(this.state.web3.currentProvider)

    let currentAddress = "";

    this.state.web3.eth.getAccounts((error, accounts) => {
      currentAddress = accounts[0];
      this.props.updateCurrentAddress(currentAddress)
      this.props.updateUserAddress(currentAddress)
    });

    etherProfile.deployed().then((instance) => {
      this.props.updateEtherProfileInstance(instance);
      console.log('**** etherProfile deployed');
      
      instance.getProfile(currentAddress).then((res, err) => {
        if(!err) {
          console.log("***** success getProfile");
          console.log(res);
        } else {
          console.log("**** error getProfile");
          console.log(err);
        }
      });
    });
  }

  render() {
    return (
      <div>
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
    updateUserAddress: address => {
      dispatch(updateUserAddress(address))
    },
    updateWeb3: web3 => {
      dispatch(updateWeb3(web3))
    },
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
