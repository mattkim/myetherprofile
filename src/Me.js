import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 

import {
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
  render() {
    return (
    <div>
        <Grid style={{
          margin: "0px",
          padding: "10px",
          "margin-top": "50px",
          paddingBottom: "100px",
        }}>
            <Row className="show-grid">
                <Col xs={3} sm={3} md={4}/>
                <Col xs={6} sm={6} md={4}>
                    <img src={this.props.user.imgurl || this.state.defaultImgurl} style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/>
                    <br/>
                    Address: {this.props.currentAddress}<br/>
                    <Link to={"/profile/" + this.props.currentAddress}>View your public profile</Link><br/>
                    <a href={`https://etherscan.io/address/${this.state.contractAddress}#code`} target="_blank">View profile contract version 0 on etherscan.io</a><br/>
                    <br/>
                    Image URL: {this.props.user.imgurl || "No image"}<br/>
                    <FormControl placeholder="Image URL" type="text" value={this.state.imgurl} onChange={this.handleImgUrlChange}/><br/>
                    Name: {this.props.user.name || "Anonymous"}<br/>
                    <FormControl placeholder="Name" type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    Email: {this.props.user.email || "No email"}<br/>
                    <FormControl placeholder="Email" type="text" value={this.state.email} onChange={this.handleEmailChange}/><br/>
                    About Me: {this.props.user.aboutMe || "No about me"}<br/>
                    <FormControl placeholder="About Me" componentClass="textarea" value={this.state.aboutMe} onChange={this.handleAboutMeChange}/><br/>

                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Col>
                <Col xs={3} sm={3} md={4}/>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Me)
