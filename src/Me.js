import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 

import {
  ETHERSCAN_LINKS,
  getEtherContractInstance,
  getEtherProfile,
  updateEtherProfile,
  updateEtherProfileName,
  updateEtherProfileEmail,
  updateEtherProfileImgurl,
  updateEtherProfileAboutMe,
} from './utils/contracts';

import {
  setAccountCreated,
  setUser,
} from './actions'

import {
	Grid,
	Row,
	Col,
	Label,
	Form,
	FormGroup,
	InputGroup,
	FormControl,
	ControlLabel,
	Checkbox,
	Button,
	DropdownButton,
	MenuItem,
	Glyphicon,
} from 'react-bootstrap';

class Me extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
    user: React.PropTypes.object,
    accountCreated: React.PropTypes.bool,
    etherProfileInstance: React.PropTypes.object,
    setAccountCreated: React.PropTypes.func,
    setUser: React.PropTypes.func,
    networkId: React.PropTypes.number,
  };

  constructor(props) {
    super(props)

    this.state = {
      contractAddress: "",
      transferAmount: 0,
      message: "",
      messages: "",
      defaultImgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZ_9QIiGlKYzIwvT7AwYsFRIUASPFJC4Zo61i905TEjvxUS6hGQ",
      name: "",
      aboutMe: "",
      email: "",
      imgurl: "",
      submitStatus: (
        <div style={{
          color: "gray",
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          width: "50%",
          fontStyle: "italic",
        }}>
          (Transaction status will show here)<br/><br/>
        </div>
      ),
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleImgUrlChange = this.handleImgUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    // set contract address here.
    const instance = await getEtherContractInstance();
    this.setState({contractAddress: instance.address});
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleAboutMeChange(e) {
    this.setState({aboutMe: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleImgUrlChange(e) {
    this.setState({imgurl: e.target.value});
  }

  async handleSubmit(e) {
    this.setState({
      submitStatus: (
        <div style={{
          color: "blue",
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          width: "50%",
        }}>
          Transaction submission pending... Transaction ID will automatically show here in a few seconds.  If it does not, find your transactions under the profile contract here:<br/>
          <a href={
            `${ETHERSCAN_LINKS[this.props.networkId] || "https://etherscan.io"}/address/${this.state.contractAddress}`
          } target="_blank">View contract on etherscan.io</a><br/><br/>
        </div>
      ),
    });
    const name = this.state.name || this.props.user.name || "";
    const imgurl = this.state.imgurl || this.props.user.imgurl || "";
    const email = this.state.email || this.props.user.email || "";
    const aboutMe = this.state.aboutMe || this.props.user.aboutMe || "";

    let res = await this.handleSingleSubmit();

    // If we did not handle single submit reset the whole thing.
    if(!res) {
      res = await updateEtherProfile(
        this.props.currentAddress,
        name,
        imgurl,
        email,
        aboutMe,
      );
    }

    // If we did the single or batch reset user.
    if(res) {
      this.props.setUser({
        name,
        aboutMe,
        email,
        imgurl,
      });

      const etherscanLink = `${ETHERSCAN_LINKS[this.props.networkId] || "https://etherscan.io"}/tx/${res.tx}`;

      this.setState({
        submitStatus: (
          <div style={{
            color: "green",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
            width: "50%",
          }}>
            Successfully submitted profile update!  Remember, transactions may take some time to complete.<br/>
            tx: {res.tx}<br/>
            <a href={etherscanLink} target="_blank">View transaction on etherscan.io</a><br/><br/>
          </div>
        )
      })
    } else {
      this.setState({
        submitStatus: (
          <div style={{
            color: "red",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
            width: "50%",
          }}>
            Profile update not submitted!  Something went wrong...<br/><br/>
          </div>
        )
      })
    }
    
    // TODO: set a status.
    // Reset state
    this.setState({
      name: "",
      aboutMe: "",
      email: "",
      imgurl: "",
    })
  }

  async handleSingleSubmit(e) {
    let res = "";

    if (this.checkOne(this.state.name)) {
      res = await updateEtherProfileName(this.props.currentAddress, this.state.name);
    } else if (this.checkOne(this.state.imgurl)) {
      res = await updateEtherProfileImgurl(this.props.currentAddress, this.state.imgurl);
    } else if (this.checkOne(this.state.email)) {
      res = await updateEtherProfileEmail(this.props.currentAddress, this.state.email);
    } else if (this.checkOne(this.state.aboutMe)) {
      res = await updateEtherProfileAboutMe(this.props.currentAddress, this.state.aboutMe);
    }

    return res;
  }

  checkOne(attr) {
    let exists = [];

    ["name", "imgurl", "email", "aboutMe"].forEach(key => {
      const val = this.state[key];
      if (val) {
        exists.push(val);
      }
    });

    return exists.length == 1 && exists[0] == attr;
  }

  // TODO: add link to current contract addresses.
  // TODO: stop double submits
  // TOOD: add another faq for supported networks. and profile contracts

  render() {
    return (
    <div>
        <Grid style={{
          margin: "0px",
          padding: "50px",
          paddingBottom: "100px",
          background: "#f7f7f7",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}>
            <Row className="show-grid">
                <Col md={9} lg={8}>
                  <div style={{
                    padding: "20px",
                    marginBottom: "20px",
                    background: "#ffffff",
                    boxShadow: "16px 16px 47px 2px rgba(0,0,0,.07)",
                  }}>
                    <h1 style={{
                      fontFamily: "\"Courier New\", Courier, monospace",
                      textAlign: "center",
                    }}>Update Your Profile</h1>
                    <img src={this.props.user.imgurl || this.state.defaultImgurl} style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/>
                    <br/>
                    {this.state.submitStatus || ""}
                    <b>Your Address:</b> {this.props.currentAddress}<br/>
                    <Link to={"/profile/" + this.props.currentAddress}>View your public profile</Link><br/>
                    <a href={`${ETHERSCAN_LINKS[this.props.networkId] || "https://etherscan.io"}/address/${this.props.currentAddress}`} target="_blank">View user on etherscan.io</a><br/>
                    <br/>
                    <b>Profile Contract Address:</b> {this.state.contractAddress}<br/>
                    <a href={`${ETHERSCAN_LINKS[this.props.networkId] || "https://etherscan.io"}/address/${this.state.contractAddress}#code`} target="_blank">View contract on etherscan.io</a><br/>
                    <br/>
                    <b>Image URL:</b> {this.props.user.imgurl || "No image"}<br/>
                    <FormControl  style={{
                      borderRadius: "0px",
                    }}placeholder="Image URL" type="text" value={this.state.imgurl} onChange={this.handleImgUrlChange}/><br/>
                    <b>Name:</b> {this.props.user.name || "Anonymous"}<br/>
                    <FormControl  style={{
                      borderRadius: "0px",
                    }}placeholder="Name" type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    <b>Email:</b> {this.props.user.email || "No email"}<br/>
                    <FormControl style={{
                      borderRadius: "0px",
                    }}placeholder="Email" type="text" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                    <b>About Me:</b> {this.props.user.aboutMe || "No about me"}<br/>
                    <FormControl style={{
                      borderRadius: "0px",
                    }} placeholder="About Me" componentClass="textarea" value={this.state.aboutMe} onChange={this.handleAboutMeChange}/><br/>
                    <span style={{
                      color: "red",
                      fontStyle: "italic",
                      textAlign: "center",
                      display: "block",
                      margin: "0 auto",
                    }}>
                      (Reminder that committing this transaction will cost gas!)
                    </span>
                    <br/>
                    <Button onClick={this.handleSubmit} style={{
                      background: "#3498db",
                      color: "white",
                      borderRadius: "0px",
                      display: "block",
                      margin: "0 auto",
                      width: "75%",
                    }}>Commit</Button>
                  </div>
                </Col>
                <Col md={3} lg={4}>
                  <div style={{
                    padding: "20px",
                    background: "#ffffff",
                    boxShadow: "16px 16px 47px 2px rgba(0,0,0,.07)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}>
                    <h4>News</h4>
                    <hr style={{
                      borderColor:"green",
                      borderWidth:"2px",
                    }}/>
                    <ul>
                      <li><b>1/18/2018</b> - Welcome to the initial launch of MyEtherProfile.  The features at the moment are limited to updating your public profile using Ethereum smart contracts, and viewing profiles on the blockchain.  Give us feedback at <a href="mailto:info@myetherprofile.com">info@myetherprofile.com</a></li>
                    </ul>
                  </div>
                  <hr/>
                  <div style={{
                    padding: "20px",
                    background: "#ffffff",
                    boxShadow: "16px 16px 47px 2px rgba(0,0,0,.07)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}>
                    <h4>FAQ</h4>
                    <hr style={{
                      borderColor:"red",
                      borderWidth:"2px",
                    }}/>
                    <ul>
                      <li><h4>Why update profile contract with my info?</h4> You want to give people with your address a way to contact you.  You want to share your address and a bit of your public information guaranteed to be uploaded by that address.</li>
                      <br/>
                      <li><h4>Are transaction costs too expensive?</h4> Possibly.  When proof of stake comes out it may be cheaper.  It is cheaper if you only update one field, and the email field provides most value.</li>
                      <br/>
                      <li><h4>Why is my address not found?</h4> Right now you need to install the <a href="https://metamask.io">Meta Mask</a> plugin.  We will support other methods in the future.</li>
                    </ul>
                  </div>
                </Col>
            </Row>
        </Grid>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAccountCreated: accountCreated => {
      dispatch(setAccountCreated(accountCreated))
    },
    setUser: user => {
      dispatch(setUser(user))
    },
  }
}

const mapStateToProps = state => {
  return {
    currentAddress: state.core.currentAddress,
    user: state.user,
    accountCreated: state.core.accountCreated,
    etherProfileInstance: state.core.etherProfileInstance,
    networkId: state.core.networkId,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Me)
