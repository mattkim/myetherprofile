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

    this.state = {        
        imgurl: "https://scontent-lax3-1.xx.fbcdn.net/v/t34.0-12/26803860_10155830078326488_1031614034_n.jpg?oh=8f1cc6262a9ecd0752e31142c6f15e7f&oe=5A5CEF3A",
        name: "Stakey Staker",
        address: "0x0000000000000000000000000000000000000000",
        aboutMe: "I like stakes",
        contact: "stakes@stake.com",
        transferAmount: 0,
        message: "",
    }
  }
  
  render() {
    return (
    <div>
        <Grid>
            <Row className="show-grid">
                <Col xs={6} md={4}/>
                <Col xs={6} md={4}>
                    <img src={this.state.imgurl} width="200px"/><br/>
                    Address: {this.state.address}<br/>
                    Name: {this.state.name}<br/>
                    About Me: {this.state.aboutMe}<br/>
                    Contact: {this.state.contact}<br/>
                    <br/>
                    Send me funds:<br/>
                    <FormControl placeholder="amount" type="text" value={this.state.transferAmount} onChange={this.handleTransferAmountChange}/> <Button onClick={this.handleTransferOnClick}>Transfer</Button> <br/>
                    <br/>
                    Direct Message:<br/>
                    <FormControl placeholder="message" type="textarea" value={this.state.message} onChange={this.handleMessageChange} rows={4}/> <Button onClick={this.handleMessageSendOnClick}>Send</Button>
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
