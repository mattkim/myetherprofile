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
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
} from 'react-bootstrap';

class Footer extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
  };

  constructor(props) {
    super(props)

    this.state = {
      search: "",
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleGo = this.handleGo.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
    })
  }

  handleGo(e) {
    if (this.state.search) {
      window.location.href = `/profile/${this.state.search}`;
      // this.props.history.push(`/profile/${this.state.search}`);

      // reset
      this.setState({
        search: "",
      });
    }
  }

  // TODO: implement enter button for search bar.
  // TODO: add network name to props

  render() {
    return (
      <div style={{
        background: "#102138",
        borderTop: "solid 2px #eee",
        color: "white",
        margin: "0px",
        // marginTop: "100px",
        // padding: "20px",
      }}>
        <Grid style={{
          margin: "0px",
        }}>
          <Row style={{
            margin: "0",
          }}>
            <Col md={4}>
              MyEtherProfile © 2018<br/>
            </Col>
            <Col md={4}>
              Eth Donations: <a style={{
                color: "#7fe5ff",
              }}
              href="https://etherscan.io/address/0xb07BA86d9f6eB62e1289a53e61F9c74DcD545b76" target="_blank">
                0xb07BA86d9f6eB62e1289a53e61F9c74DcD545b76
              </a>
            </Col>
            <Col md={4}>
              Contact Us: <a style={{
                color: "#7fe5ff",
              }} href="mailto:info@myetherprofile.com">info@myetherprofile.com</a><br/>
              Github: <a style={{
                color: "#7fe5ff",
              }} href="https://github.com/mattkim/myetherprofile" target="_blank">https://github.com/mattkim/myetherprofile</a><br/>
            </Col>
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
)(Footer)
