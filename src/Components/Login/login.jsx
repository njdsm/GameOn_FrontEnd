import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import './login.css';


class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: "",
            password: ""
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(user);
    }

    render() {
        return (
            <div className="form">
                <h4>Login</h4>
                <form onSubmit={(e) => this.onSubmit(e)} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="userName">Username: </label>
                        <input className="form-rounded form-control" type="text" name="username" onChange={(e) => this.onChange(e)} value={this.state.username} spellCheck="false"/>
    
                        <label htmlFor="password">Password: </label>
                        <input className="form-rounded form-control" type="text" name="password" onChange={(e) => this.onChange(e)} value={this.state.password} spellCheck="false"/>
    
                        <br/>
                        <button className="btn btn-success" type="submit">Login!</button>
                    </div>
                </form>
            </div>
        )
    }
    
    
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
};



export default connect(null, { login })(Login);
