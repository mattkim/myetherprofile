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

    this.state = {}
  }
  
  render() {
    return (
        <div style={{
            padding:"10px",
        }}>
            <div className="pull-left">
                <Link to="/">MyEtherProfile</Link> 
            </div>
            <div className="pull-right">
                {this.props.currentAddress || "address not found"}
            </div>
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
