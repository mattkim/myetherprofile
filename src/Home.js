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
  };

  constructor(props) {
    super(props)

    this.state = {}
  }
  
  render() {
    return (
    <div>
        <Grid>
            <Row className="show-grid">
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}>
                    <h1>MyEtherProfile</h1>
                    <p>Your profile for block chains.</p>
                    <Link to="/me">
                        <Button bsStyle="info">Edit Profile</Button>
                    </Link>
                </Col>
                <Col xsHidden md={4}/>
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
