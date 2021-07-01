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
                    <ul class="navbar-nav">
                        <Link to="/" class="nav-link">
                            <li class="navbar-brand nav-item">
                                <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
                                GameOn
                            </li>
                        </Link>
                        <Link to="/profile" class="nav-link">
                            <li class="navbar-brand nav-item">
                                Profile
                            </li>
                        </Link>
                        <button className="btn btn-dark" onClick={() => this.props.logout()}>Logout</button>
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
                            <Link to="/" class="nav-link">
                                <li class="navbar-brand nav-item">
                                    <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
                                    GameOn
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