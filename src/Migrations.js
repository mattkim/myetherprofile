import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'; 
import { getMigrations, getMigrationsInstance } from './utils/contracts';
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

class Migrations extends Component {
  static propTypes = {
    currentAddress: React.PropTypes.string,
  };

  constructor(props) {
    super(props)

    this.state = {
        contractAddress: "",
        date: "",
        gasPrice: "",
        gasLimit: "",
        setCompletedStatus: "",
        updateStatus: "",
        contractDate: "",
        contractOwner: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleContractAddressChange = this.handleContractAddressChange.bind(this);
    this.handleGasPriceChange = this.handleGasPriceChange.bind(this);
    this.handleGasLimitChange = this.handleGasLimitChange.bind(this);
    this.handleGet = this.handleGet.bind(this);
  }

  handleDateChange(e) {
    this.setState({date: e.target.value})
  }

  handleContractAddressChange(e) {
    this.setState({contractAddress: e.target.value})
  }

  handleGasPriceChange(e) {
    this.setState({gasPrice: e.target.value})
  }

  handleGasLimitChange(e) {
    this.setState({gasLimit: e.target.value})
  }

  async handleGet(e) {
    try{
      const migrations = await getMigrations();
      console.log(migrations);
      const instance = await migrations.at(this.state.contractAddress);
      const owner = await instance.owner();
      const last_completed_migration = await instance.last_completed_migration();
      console.log(instance);
      console.log(owner);
      console.log(last_completed_migration);
      this.setState({
        contractOwner: owner,
        contractDate: last_completed_migration.toNumber(),
      })
    } catch(err) {
      console.log(err);
    }
  }

  async handleSubmit(e){
    const migrations = await getMigrationsInstance();
    console.log(migrations);

    try{
      const res = await migrations.setCompleted(
        this.state.date,
        {
          from: this.props.currentAddress,
          gasPrice: this.state.gasPrice,
          gas: this.state.gasLimit,
        }
      )
      if (res) {
        this.setState({
          setCompletedStatus: res.tx,
        });
      }
      
      const res2 = migrations.update(
        this.state.contractAddress,
        {
          from: this.props.currentAddress,
          gasPrice: this.state.gasPrice,
          gas: this.state.gasLimit,
        },
      );

      if (res2) {
        this.setState({
          updateStatus: res2.tx,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
    <div>
        <Grid>
            <Row className="show-grid">
                <Col xs={3} sm={3} md={4}/>
                <Col xs={6} sm={6} md={4}>
                    setCompleted status: {this.state.setCompletedStatus}<br/>
                    update status: {this.state.udpateStatus}<br/>
                    <hr/>
                    <h1>Get Contract Info</h1>
                    contractOwner: {this.state.contractOwner}<br/>
                    contractDate: {this.state.contractDate}<br/>
                    <FormControl placeholder="contract address" type="text" value={this.state.contractAddress} onChange={this.handleContractAddressChange}/><br/>
                    <Button onClick={this.handleGet}>Get Info</Button>
                    <hr/>
                    <h1>Update</h1>
                    currentAddress: {this.props.currentAddress}<br/>
                    date: {this.state.date}<br/>
                    gasPrice: {this.state.gasPrice}<br/>
                    gasLimit: {this.state.gasLimit}<br/>
                    <FormControl placeholder="contract address" type="text" value={this.state.contractAddress} onChange={this.handleContractAddressChange}/><br/>
                    <FormControl placeholder="date" type="text" value={this.state.date} onChange={this.handleDateChange}/><br/>
                    <FormControl placeholder="gas price" type="text" value={this.state.gasPrice} onChange={this.handleGasPriceChange}/><br/>
                    <FormControl placeholder="gas limit" type="text" value={this.state.gasLimit} onChange={this.handleGasLimitChange}/><br/>
                    <Button onClick={this.handleSubmit}>Update</Button>
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
)(Migrations)
