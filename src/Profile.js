import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 
import { ETHERSCAN_LINKS, simple, getEtherProfile } from './utils/contracts';
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
    networkId: React.PropTypes.number,
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

  // TODO: support this later.
  renderTransfer() {
    return (
      <div>
        <hr/>
        <b>Send me ether:</b><br/>
        <i>(This will not use the profile contract, meaning no extra fees.)</i>
        <FormControl placeholder="amount" type="text" value={this.state.transferAmount} onChange={this.handleTransferAmountChange}/><br/>
        <Button  style={{
          background: "#3498db",
          color: "white",
          borderRadius: "0px",
          display: "block",
          margin: "0 auto",
          width: "75%",
        }}onClick={this.handleTransferOnClick}>Transfer</Button> <br/>
      </div>
    )
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
  
  // TODO: steak doesn't show up when not connected
  render() {
    return (
    <div>
        <Grid style={{
          // margin: "0px",
          fontSize: ".9em",
          padding: "50px",
          paddingBottom: "100px",
          fontFamily: "Arial, Helvetica, sans-serif",
          background: "#f7f7f7",
        }}>
            <Row className="show-grid">
                <Col md={3} lg={3}/>
                <Col md={6} lg={6}>
                  <div style={{
                    padding: "20px",
                    marginBottom: "20px",
                    background: "#ffffff",
                    boxShadow: "16px 16px 47px 2px rgba(0,0,0,.07)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    <img src={this.state.profileImgurl}  style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/>
                    <hr/>
                    <strong>Address:</strong> {this.props.match.params.address}<br/>
                    <a href={`${ETHERSCAN_LINKS[this.props.networkId] || "https://etherscan.io"}/address/${this.props.match.params.address}`} target="_blank">
                      View user on etherscan.io
                    </a><br/><br/>
                    <strong>Name:</strong> {this.state.profileName}<br/>
                    <strong>Email:</strong> {this.state.profileEmail}<br/>
                    <strong>About Me:</strong> {this.state.profileAboutMe}<br/>
                  </div>
                </Col>
                <Col md={3} lg={3}/>
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
    networkId: state.core.networkId,
    // etherProfileInstance: state.core.etherProfileInstance,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
