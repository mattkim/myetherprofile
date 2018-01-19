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

class Home extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
  };

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
    <div>
        <Grid style={{
          marginTop: "30px",
          padding: "10px",
          paddingBottom: "100px",
        }}>
            <Row className="show-grid">
                <Col xs={3} sm={3} md={3} lg={4}/>
                <Col xs={6} sm={6} md={6} lg={4}>
                    <span style={{
                      fontSize: "22px",
                      lineHeight: "26px",
                      color: "#3683D2",
                      fontWeight: "bold",
                    }}>
                      A super simple way to personalize your ether address.
                    </span>
                    <br/><br/>
                    <span style={{
                      color: "#353535",
                      fontSize: "14px",
                      lineHeight: "17px",
                    }}>
                      By updating your profile you can let others know a little bit more about your account, and also potentially give them a way to contact you if you lose your keys.
                    </span>
                    <br/><br/>
                    <img style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxfzKDDIQmmUOj4XP2S28YP5511muPd-ghpAZKlufk0M8la3cK8g"/>
                    <hr/>
                    <span style={{
                      fontSize: "16px",
                      lineHeight: "15px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}>
                      <Link to="/me">Update Your Profile >></Link>
                    </span>
                    <br/><br/>
                    <span style={{
                      color: "#353535",
                      fontSize: "12px",
                      lineHeight: "17px",
                    }}>
                      <ul>
                        <li>Updates are saved to an ether contract</li>
                        <li>Only editable by the address owner</li>
                        <li>Transaction costs are minimized as much as possible</li>
                      </ul>
                    </span>
                    <hr/>
                    <span style={{
                      fontSize: "16px",
                      lineHeight: "15px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}>
                      <Link to={`/profile/${this.props.currentAddress}`}>View Your Profile >></Link>
                    </span>
                    <br/><br/>
                    <span style={{
                      color: "#353535",
                      fontSize: "12px",
                      lineHeight: "17px",
                    }}>
                      <ul>
                        <li>Information you publish is always public</li>
                        <li>Requires access through the blockchain with an app like metamask</li>
                        <li>Reads are viewable and thus free of transaction costs</li>
                      </ul>
                    </span>
                </Col>
                <Col xs={3} sm={3} md={3} lg={4}/>
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
    currentAddress: state.core.currentAddress,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
