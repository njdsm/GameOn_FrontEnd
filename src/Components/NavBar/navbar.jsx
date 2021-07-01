import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

import "./navbar.css"

class NavBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.user.length != 0){
            console.log(this.props.user.items)
            return(
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav nav navbar">
                                <Link to="/" class="nav-link main-title">
                                    <li>
                                        <strong className="main-title">GameOn</strong>
                                    </li>
                                </Link>
                                <Link to="/profile" class="nav-link">
                                    <li >
                                        Profile
                                    </li>
                                </Link>
                                <Link class="nav-link" to="/login" onClick={() => this.props.logout()}>
                                    <li>
                                        Logout
                                    </li>
                                </Link>
                            </ul>
                        </div>
                </nav>
            )
        }
        else {
            console.log(this.props.user.items)
            return(
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <Link to="/" class="nav-link main-title">
                                <li>
                                    <strong className="main-title">GameOn</strong>
                                </li>
                            </Link>
                            <Link to="/login" class="nav-link">
                                <li class="navbar-brand nav-item">
                                    Login
                                </li>
                            </Link>
                            <Link to="/registration" class="nav-link">
                                <li class="navbar-brand nav-item">
                                    SignUp
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            );
        }
        
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user.items,
});

export default connect(mapStateToProps, { logout })(NavBar);