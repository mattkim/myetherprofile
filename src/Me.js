import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 

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
        contact: "",
        imgurlInput: "",
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleImgUrlChange = this.handleImgUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleAboutMeChange(e) {
    this.setState({aboutMe: e.target.value});
  }

  handleContactChange(e) {
    this.setState({contact: e.target.value});
  }

  handleImgUrlChange(e) {
    this.setState({imgurlInput: e.target.value});
  }

  handleSubmit(e) {
    const name = this.state.name || this.props.user.name || "";
    const imgurl = this.state.imgurlInput || this.props.user.imgurl || "";
    const contact = this.state.contact || this.props.user.contact || "";
    const aboutMe = this.state.aboutMe || this.props.user.aboutMe || "";
    
    this.props.etherProfileInstance.updateProfile(
      name,
      imgurl,
      contact,
      aboutMe,
      {
        from: this.props.currentAddress,
      }
    ).then((res,err) => {
      if(!err) {
        this.props.etherProfileInstance.getProfile(
          this.props.currentAddress,
        ).then((res, err) => {
          this.props.setAccountCreated(true);

          this.props.setUser({
            name,
            imgurl,
            contact,
            aboutMe,
          });

          this.setState({
            name,
            imgurl,
            contact,
            aboutMe,
          });
        });
      }
    });
  }
  
  render() {
    return (
    <div>
        <Grid style={{
          margin: "0px",
          padding: "10px",
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
                    Address: <Link to={"/profile/" + this.props.currentAddress}>{this.props.currentAddress}</Link><br/>
                    <br/>
                    Image URL:<br/>
                    <FormControl placeholder="No image" type="text" value={this.state.imgurlInput || this.props.user.imgurl} onChange={this.handleImgUrlChange}/><br/>
                    Name:<br/>
                    <FormControl placeholder="Anonymous" type="text" value={this.state.name || this.props.user.name} onChange={this.handleNameChange}/><br/>
                    Contact:<br/>
                    <FormControl placeholder="No contact" type="text" value={this.state.contact || this.props.user.contact} onChange={this.handleContactChange}/><br/>
                    About Me:<br/>
                    <FormControl placeholder="No description" componentClass="textarea" value={this.state.aboutMe || this.props.user.aboutMe} onChange={this.handleAboutMeChange}/><br/>

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
