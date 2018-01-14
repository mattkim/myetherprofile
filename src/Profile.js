import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 

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

class Profile extends Component {
  static propTypes = {
    etherProfileInstance: React.PropTypes.object,
  };

  constructor(props) {
    super(props)

    this.state = {
        profileAddress: "",
        transferAmount: 0,
        message: "",
        profile: {},
    }
  }

  componentWillReceiveProps() {
    this.getProfile();
  }

  componentWillMount() {
    this.getProfile();
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    const address = this.props.match.params.address;
    this.setState({profileAddress: address});

    if(this.props.etherProfileInstance) {
      this.props.etherProfileInstance.getProfile(
        address,
      ).then((res, err) => {
        if(
          !err && 
          res[0] !== "0x0000000000000000000000000000000000000000"
        ) {
          this.setState({
            profile: {
              address,
              name: res[2],
              imgurl: res[3],
              contact: res[4],
              aboutMe: res[5],
            }
          });
        } else {
          this.setDefaultProfile(address);
        }
      });
    } else{
      this.setDefaultProfile(address);
    }
  }

  setDefaultProfile(address) {
    this.setState({
      profile: {
        address,
        imgurl: "https://scontent-lax3-1.xx.fbcdn.net/v/t34.0-12/26803860_10155830078326488_1031614034_n.jpg?oh=8f1cc6262a9ecd0752e31142c6f15e7f&oe=5A5CEF3A",
        name: "Anonymous",
        aboutMe: "No description",
        contact: "No contact",
      }
    });
  }

  // TODO: interesting part here is that you have to pay to create
  // a profile to get a dm, or else the profile won't exist to send
  // it to.
  // You could have a pending dm feature, so that the user can
  // see all of them afterwards.
  // Or you can store the DM's in a separate data structure
  // And anyone can read, because it's shared. this makes more
  // sense.

  // TODO: you can see some addresses on etherscan.
  
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
                    <img src={this.state.profile.imgurl}  style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/><br/>
                    <strong>Address:</strong> {this.state.profile.address}<br/>
                    <a href={"https://etherscan.io/address/" + this.state.profileAddress} target="_blank">
                      view on etherscan.io
                    </a><br/>
                    <strong>Name:</strong> {this.state.profile.name}<br/>
                    <strong>Contact:</strong> {this.state.profile.contact}<br/>
                    <strong>About Me:</strong> {this.state.profile.aboutMe}<br/>
                    <br/>
                    Send me ether:<br/>
                    <FormControl placeholder="amount" type="text" value={this.state.transferAmount} onChange={this.handleTransferAmountChange}/><br/>
                    <Button onClick={this.handleTransferOnClick}>Transfer</Button> <br/>
                    <br/>
                    Direct Message:<br/>
                    <FormControl placeholder="message" componentClass="textarea" value={this.state.message} onChange={this.handleMessageChange}/><br/>
                    <Button onClick={this.handleMessageSendOnClick}>Send</Button>
                </Col>
                <Col xs={3} sm={3} md={4}/>
            </Row>
        </Grid>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {
    etherProfileInstance: state.core.etherProfileInstance,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
