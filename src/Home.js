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
          "margin-top": "30px",
          padding: "10px",
          "margin-bottom": "20px",
        }}>
            <Row className="show-grid">
                <Col xs={3} sm={3} md={4}/>
                <Col xs={6} sm={6} md={4}>
                    <h4>Your profile for block chains.</h4>
                    <Link to="/me" style={{
                      marginRight: "10px",
                    }}>
                      <Button bsStyle="info">Update Profile</Button>
                    </Link>
                    <Link to={`/profile/${this.props.currentAddress}`}>
                      <Button bsStyle="success">View Profile</Button>
                    </Link>
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
    currentAddress: state.core.currentAddress,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
