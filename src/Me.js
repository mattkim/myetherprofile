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

class Me extends Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props)

    this.state = {        
        imgurl: "https://scontent-lax3-1.xx.fbcdn.net/v/t34.0-12/26803860_10155830078326488_1031614034_n.jpg?oh=8f1cc6262a9ecd0752e31142c6f15e7f&oe=5A5CEF3A",
        name: "Stakey Staker",
        aboutMe: "I like stakes",
        contact: "stakes@stake.com",
        transferAmount: 0,
        message: "",
        messages: "",
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleAboutMeChange(e) {
    this.setState({aboutMe: e.target.value});
  }

  handleContactChange(e) {
    this.setState({contact: e.target.value});
  }

  handleImgUrlChange(e) {
    this.setState({imgurl: e.target.value});
  }

  handleSubmit(e) {
    console.log("**** handleSubmit");
    console.log(this.state);
    console.log(e);
  }
  
  render() {
    return (
    <div>
        <Grid>
            <Row className="show-grid">
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}>
                    <img src={this.state.imgurl} style={{
                      display: "block",
                      margin: "0 auto",
                      width: "200px",
                    }}/>
                    <br/>
                    Address: <Link to={"/profile/" + this.props.user.address}>{this.props.user.address}</Link><br/>
                    <br/>
                    Image URL:<br/>
                    <FormControl placeholder="img url" type="text" value={this.state.imgurl} onChange={this.handleImgUrlChange}/><br/>
                    Name:<br/>
                    <FormControl placeholder="name" type="text" value={this.state.name} onChange={this.handleNameChange}/><br/>
                    Contact:<br/>
                    <FormControl placeholder="contact" type="text" value={this.state.contact} onChange={this.handleContactChange}/><br/>
                    About Me:<br/>
                    <FormControl placeholder="about me" componentClass="textarea" value={this.state.aboutMe} onChange={this.handleAboutMeChange}/><br/>
                    
                    <Button onClick={this.handleSubmit}>Submit</Button>
                  
                    <hr/>
                    Direct Messages:<br/>
                    {this.state.messages}
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
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Me)
