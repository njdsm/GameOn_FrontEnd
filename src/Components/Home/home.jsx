import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats, fetchPlayerStats } from '../../actions/statsActions';
import { startGame, joinGame, sendQuestion } from '../../actions/currentGameActions'

import './home.css';


class Home extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchStats();
        this.props.fetchGames();
    }

    startNewGame(game){
        this.props.startGame(this.props.user, game)
        for (let i = 0; i < this.props.users.length; i++){
            if (this.props.users[i].logged_in === true){
                let question = {"question": "Starting a new Trivia game! " + game.name + "! Join us now!"}
                this.props.sendQuestion(question, this.props.users[i])
            }
        }
    }
    
    joinNewGame(game){
        this.props.joinGame(this.props.user, game)
    }

    isGameActive(game){
        if (game.is_active === true){
            return (
                <button onClick={() => this.joinNewGame(game)}>Join game</button>
            ) 
        }
    }

    mapGames(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div class="row" key={game.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title game-name">{game.name}</h5>
                        <p class="card-text">{game.description}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Minimum Players: {game.player_min}</small>
                    </div>
                </div>
            </div>
        ));
    }

    mapGamesHost(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div class="row" key={game.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title game-name">{game.name}</h5>
                        <p class="card-text">{game.description}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Minimum Players: {game.player_min}</small>
                    </div>
                    <button onClick={() => this.startNewGame(game)}>Start game</button>
                </div>
            </div>
        ));
    }

    mapGamesPlayer(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div class="row" key={game.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title game-name">{game.name}</h5>
                        <p class="card-text">{game.description}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Minimum Players: {game.player_min}</small>
                    </div>
                    {this.isGameActive(game)}
                </div>
            </div>
        ));
    }

    render(){
        if (this.props.user.length !== 0 && this.props.user.host === true){
            return(
                <div>
                    {this.mapGamesHost()}
                </div>
            ) 
        } 
        else if (this.props.user.length !== 0 ){
            return(
                <div>
                    {this.mapGamesPlayer()}
                </div>
            ) 
        }
        else{
            return(
                <div>
                    {this.mapGames()}
                </div>
            ) 
        }
    }
}

Home.propTypes = {
    fetchStats: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
    fetchPlayerStats: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    sendQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items,
    currentGame: state.currentGame.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats, startGame, joinGame, sendQuestion })(Home);