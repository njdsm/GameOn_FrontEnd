import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import './registrationForm.css';


class RegistrationForm extends Component {
    constructor(props){
        super(props)
        this.state ={
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            email: "",
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
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            user_name: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.registerUser(user);
    }

    render() {
        return (
            <div className="form">
                <h4>Sign Up</h4>
                <form onSubmit = {(e) => this.onSubmit(e)} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="firstName">First Name: </label>
                        <input className="form-rounded form-control" type="text" name="first_name" onChange={(e) => this.onChange(e)} value={this.state.first_name} spellCheck="false"/>

                        <label htmlFor="lastName">Last Name: </label>
                        <input className="form-rounded form-control" type="text" name="last_name" onChange={(e) => this.onChange(e)} value={this.state.last_name} spellCheck="false"/>

                        <label htmlFor="userName">Username: </label>
                        <input className="form-rounded form-control" type="text" name="username" onChange={(e) => this.onChange(e)} value={this.state.username} spellCheck="false"/>

                        <label htmlFor="password">Password: </label>
                        <input className="form-rounded form-control" type="text" name="password" onChange={(e) => this.onChange(e)} value={this.state.password} spellCheck="false"/>

                        <label htmlFor="email">Email: </label>
                        <input className="form-rounded form-control" type="text" name="email" onChange={(e) => this.onChange(e)} value={this.state.email} spellCheck="false"/>

                        <label htmlFor="phoneNumber">Phone Number: </label>
                        <input className="form-rounded form-control" type="text" name="phone" onChange={(e) => this.onChange(e)} value={this.state.phone} spellCheck="false"/>
                        <br/>
                        <button className="btn btn-success" type="submit">Sign Up!</button>
                    </div>
                </form>
            </div>
        )
    }
}

RegistrationForm.propTypes = {
    registerUser: PropTypes.func.isRequired
};

// export default RegistrationForm;
export default connect(null, { registerUser })(RegistrationForm);
