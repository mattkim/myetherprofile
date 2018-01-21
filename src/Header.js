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
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(e) {
    e.preventDefault();
    e.target[0].value = ''; // eslint-disable-line no-param-reassign
    this.handleGo(); // Probably don't need ot pass along the event.
  }

  render() {
    return (
      <div style={{
        borderBottom: "solid 2px #eee",
      }}>
        <Grid style={{
          margin: "0px",
          padding: "20px",
        }}>
          <Row>
            <Col md={6}>
              <Link to="/" style={{
                fontFamily: "'Arial Black', Gadget, sans-serif",
                fontSize: "2em",
                textDecoration: "none",
              }}>
                MyEtherProfile
              </Link> 
            </Col>
            <Col md={6}>
            <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
              <InputGroup className="pull-right" style={{
                width: "350px",
                marginBottom: "10px",
              }}>
                <FormControl style={{borderRadius: "0px"}} placeholder="Lookup Profile by Address" type="text" value={this.state.search} onChange={this.handleSearchChange}/>
                <InputGroup.Button>
                  <Button onClick={this.handleGo} style={{
                    background: "#3498db",
                    color: "white",
                    borderRadius: "0px",
                  }}>Go</Button>
                </InputGroup.Button>
              </InputGroup>
            </Form>
            </Col>
          </Row>
          <Row style={{
            margin: "0px",
            textAlign: "right",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#666666",
          }}>
              <b>Your address: </b> 
              {
                this.props.currentAddress ? 
                  <Link to={`/profile/${this.props.currentAddress}`}>
                    {this.props.currentAddress}
                  </Link>
                : "address not found"
              }
              
              <span style={{ opacity: "0.1" }}> | </span>
              <b>Network:</b> { NETWORK_IDS[this.props.networkId] || 'localhost'}
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
