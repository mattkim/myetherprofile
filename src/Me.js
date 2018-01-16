import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 

import {getEtherProfile, updateEtherProfile} from './utils/contracts';

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
        transferAmount: 0,
        message: "",
        messages: "",
        defaultImgurl: "https://scontent-lax3-1.xx.fbcdn.net/v/t34.0-12/26803860_10155830078326488_1031614034_n.jpg?oh=8f1cc6262a9ecd0752e31142c6f15e7f&oe=5A5CEF3A",
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
    
    const res = await updateEtherProfile(
      this.props.currentAddress,
      name,
      imgurl,
      email,
      aboutMe,
    );
    
    if(res) {
      this.props.setUser(res);
    }

    // Reset state
    this.setState({
      name: "",
      aboutMe: "",
      email: "",
      imgurl: "",
    })
  }
  
  render() {
    return (
    <div>
        <Grid style={{
          margin: "0px",
          padding: "10px",
          "margin-top": "50px",
          "margin-bottom": "20px",
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
                    <Link to={"/profile/" + this.props.currentAddress}>View public profile</Link><br/>
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
