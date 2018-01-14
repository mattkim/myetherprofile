import React, { Component } from 'react'
import EtherProfileContract from '../build/contracts/EtherProfile.json'
import getWeb3 from './utils/getWeb3'
import { connect } from 'react-redux'

import {
  setAccountCreated,
  setUser,
  updateCurrentAddress,
  updateEtherProfileInstance,
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
    updateWeb3: React.PropTypes.func,
    setAccountCreated: React.PropTypes.func,
    setUser: React.PropTypes.func,
  };

  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
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
    });

    etherProfile.deployed().then((instance) => {
      this.props.updateEtherProfileInstance(instance);

      instance.getProfile(currentAddress).then((res, err) => {
        // Profile did not exist
        if(
          !err &&
          res[0] !== "0x0000000000000000000000000000000000000000"
        ) {
          // TODO: for some reason this doesn't set user
          // on the /me page
          console.log("**** getProfile success");
          console.log(res);
          this.props.setAccountCreated(true);
          this.props.setUser({
            name: res[2],
            imgurl: res[3],
            contact: res[4],
            aboutMe: res[5],
          });
        } else {
          console.log("**** getProfile failure");
          console.log(res);
          console.log(err);
          this.props.setAccountCreated(false);
        }
      });
    });

    this.props.setAccountCreated(false);
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
