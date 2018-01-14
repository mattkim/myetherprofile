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

class Header extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
  };

  constructor(props) {
    super(props)

    this.state = {
      search: "",
    }
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
    })
  }
  
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
                  <Button>Go</Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
          </Row>
          <Row style={{
            margin: "0px",
            "text-align": "right",
          }}>
            Your address: {this.props.currentAddress || "address not found"}
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
)(Header)
