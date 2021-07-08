import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { getHost } from '../../actions/hostActions';
import './login.css';


class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: "",
            password: "",
            key: ""
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
            user_name: this.state.username,
            password: this.state.password
        }
        this.props.login(user);
        this.props.getHost(this.state.key);
        this.setState({username: "", password: "", key: ""})
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
                        <label htmlFor="key">Key: </label>
                        <input className="form-rounded form-control" type="text" name="key" onChange={(e) => this.onChange(e)} value={this.state.key} spellCheck="false"/>
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
    getHost: PropTypes.func.isRequired,
};

export default connect(null, { login, getHost })(Login);
