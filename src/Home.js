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
    accountCreated: React.PropTypes.bool,
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
                    {
                      this.props.accountCreated ?
                      <Link to="/me">
                        <Button bsStyle="info">Edit Profile</Button>
                      </Link> : 
                      <Link to="/me">
                        <Button bsStyle="success">Create Profile</Button>
                      </Link>
                    }
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
    accountCreated: state.core.accountCreated,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
