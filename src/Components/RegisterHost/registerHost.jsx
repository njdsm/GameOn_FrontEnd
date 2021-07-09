import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { becomeHost } from '../../actions/authActions';
import axios from 'axios';
import './registerHost.css';


class RegisterHost extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: "",
            address: "",
            key: "",
            phone: ""
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        debugger
        let user = this.props.user
        user.host = true;
        axios.put("http://127.0.0.1:8000/users/" + user.id + "/", user)
        const host = {
            name: this.state.name,
            address: this.state.address,
            key: this.state.key,
        }
        this.props.becomeHost(host);
        this.setState({name: "", address: "", key: ""})
        alert("Congrats, you are now a host!");
    }

    render() {
        return (
            <div className="form">
                <h4>Become a Host</h4>
                <form onSubmit = {(e) => this.onSubmit(e)} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="name">Name of buisiness: </label>
                        <input className="form-rounded form-control" type="text" name="name" onChange={(e) => this.onChange(e)} value={this.state.name} spellCheck="false"/>
                        <br/>
                        <label htmlFor="address">Address: </label>
                        <input className="form-rounded form-control" type="text" name="address" onChange={(e) => this.onChange(e)} value={this.state.address} spellCheck="false"/>
                        <br/>
                        <label htmlFor="phone">Phone Number: </label>
                        <input className="form-rounded form-control" type="text" name="phone" onChange={(e) => this.onChange(e)} value={this.state.phone} spellCheck="false"/>
                        <br/>
                        <label htmlFor="key">Set a password for users to login to your location specifically: </label>
                        <p><weak>Display this somewhere in your business.</weak></p>
                        <input className="form-rounded form-control" type="text" name="key" onChange={(e) => this.onChange(e)} value={this.state.key} spellCheck="false"/>
                        <br/>
                        <button className="btn btn-dark" type="submit">Sign Up!</button>
                    </div>
                </form>
            </div>
        )
    }
}

RegisterHost.propTypes = {
    becomeHost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user.items,
});

// export default RegistrationForm;
export default connect(mapStateToProps, { becomeHost })(RegisterHost);
