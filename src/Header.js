import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 
import {NETWORK_IDS} from './utils/contracts';

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

class Header extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
    networkId: React.PropTypes.string,
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
        "border-bottom": "solid 2px #eee",
      }}>
        <Grid style={{
          margin: "0px",
          padding: "10px",
        }}>
          <Row>
            <Col md={6}>
              <Link to="/" style={{
                "font-family": "'Oswald', 'Arial Narrow', sans-serif",
                "font-size": "2em",
                textDecoration: "none",
              }}>
                MyEtherProfile
              </Link> 
            </Col>
            <Col md={6}>
              <InputGroup className="pull-right" style={{
                width: "350px",
                "margin-bottom": "10px",
              }}>
                <FormControl placeholder="Search by address" type="text" value={this.state.search} onChange={this.handleSearchChange}/>
                <InputGroup.Button>
                  <Button onClick={this.handleGo}>Go</Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
          </Row>
          <Row style={{
            margin: "0px",
            textAlign: "right",
          }}>
              Your address: {this.props.currentAddress || "address not found"} | Network: { NETWORK_IDS[this.props.networkId] || 'localhost'}
          </Row>
          <Row style={{
            margin: "5px",
            fontSize: "16px",
            fontWeight: "bold",
          }}>
            <Link to="/me" style={{
              marginRight: "10px",
              marginLeft: "10px"
            }}>Update Profile</Link>|
            <Link to={`/profile/${this.props.currentAddress}`} style={{
              marginRight: "10px",
              marginLeft: "10px",
            }}>View Profile</Link>
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
    networkId: state.core.networkId,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
