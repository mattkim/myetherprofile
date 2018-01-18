import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 
import { simple, getEtherProfile } from './utils/contracts';
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
        profileName: "",
        profileImgurl: "",
        profileEmail: "",
        profileAboutMe: "",
    }
  }

  async componentWillMount() {
    const res = await getEtherProfile(this.props.match.params.address);
    this.setProfile(res);
  }

  async componentWillReceiveProps() {
    const res = await getEtherProfile(this.props.match.params.address);
    this.setProfile(res);
  }

  async componentDidMount() {
    const res = await getEtherProfile(this.props.match.params.address);
    this.setProfile(res);
  }

  setProfile(res) {
    // TODO: image doesn't seem to update right away.
    // TODO: because i need to both dual
    // TODO: handle empty account
    if(res) {
      this.setState({
        profileName: res.name || "Anonymous",
        profileImgurl: res.imgurl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZ_9QIiGlKYzIwvT7AwYsFRIUASPFJC4Zo61i905TEjvxUS6hGQ",
        profileEmail: res.email || "No email",
        profileAboutMe: res.aboutMe || "No description",
      });
    } else {
      this.setDefaultProfile(this.props.match.params.address);
    }
  }

  setDefaultProfile(address) {
    this.setState({
      profileImgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZ_9QIiGlKYzIwvT7AwYsFRIUASPFJC4Zo61i905TEjvxUS6hGQ",
      profileName: "Anonymous",
      profileAboutMe: "No description",
      profileEmail: "No email",
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
          "margin-top": "50px",
          "margin-bottom": "20px",
        }}>
            <Row className="show-grid">
                <Col xs={3} sm={3} md={4}/>
                <Col xs={6} sm={6} md={4}>
                    <img src={this.state.profileImgurl}  style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/><br/>
                    <strong>Address:</strong> {this.props.match.params.address}<br/>
                    <a href={"https://etherscan.io/address/" + this.props.match.params.address} target="_blank">
                      view on etherscan.io
                    </a><br/>
                    <strong>Name:</strong> {this.state.profileName}<br/>
                    <strong>Email:</strong> {this.state.profileEmail}<br/>
                    <strong>About Me:</strong> {this.state.profileAboutMe}<br/>
                    <br/>
                    Send me ether:<br/>
                    <FormControl placeholder="amount" type="text" value={this.state.transferAmount} onChange={this.handleTransferAmountChange}/><br/>
                    <Button onClick={this.handleTransferOnClick}>Transfer</Button> <br/>
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
    // etherProfileInstance: state.core.etherProfileInstance,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
