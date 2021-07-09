import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame } from '../../actions/gameActions';
import './createGame.css';


class CreateGame extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: "",
            description: "",
            player_min: "",
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const game = {
            name: this.state.name,
            description: this.state.description,
            player_min: this.state.player_min,
            owner_id: this.props.host.id,
            is_active: false,
        }
        this.props.createGame(game);
        this.setState({name: ""})
        this.setState({description: ""})
        this.setState({player_min: ""})
        alert("Game created!")
    }

    render() {
        return (
            <div className="form">
                <h4>Sign Up</h4>
                <form onSubmit = {(e) => this.onSubmit(e)} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="firstName">Game Name: </label>
                        <input className="form-rounded form-control" type="text" name="name" onChange={(e) => this.onChange(e)} value={this.state.name} spellCheck="false"/>

                        <label htmlFor="lastName">Description: </label>
                        <input className="form-rounded form-control" type="text" name="description" onChange={(e) => this.onChange(e)} value={this.state.description} spellCheck="false"/>

                        <label htmlFor="userName">Minimum Players: </label>
                        <input className="form-rounded form-control" type="text" name="player_min" onChange={(e) => this.onChange(e)} value={this.state.player_min} spellCheck="false"/>
                        <br/>
                        <button className="btn btn-dark" type="submit">Create Game!</button>
                    </div>
                </form>
            </div>
        )
    }
}

CreateGame.propTypes = {
    createGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    host: state.host.items
});

// export default RegistrationForm;
export default connect(mapStateToProps, { createGame })(CreateGame);
