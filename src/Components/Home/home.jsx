import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats, fetchPlayerStats } from '../../actions/statsActions';
import { startGame, joinGame } from '../../actions/currentGameActions'

import './home.css';


class Home extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Home Mount");
        this.props.fetchStats();
        this.props.fetchGames();
        // this.props.fetchPlayerStats();
    }

    startNewGame(game){
        this.props.startGame(this.props.user, game)
    }
    
    joinNewGame(game){
        this.props.joinGame(this.props.user, game)
    }

    isGameActive(game){
        debugger
        if (game.is_active === true){
            return (
                <Link to='/active_game'>
                    <button onClick={() => this.joinNewGame(game)}>Join game</button>
                </Link>
            ) 
        }
    }

    mapGames(){
        debugger
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
                    <Link to="/active_game">
                        <button onClick={() => this.startNewGame(game)}>Start game</button>
                    </Link>
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
                    {() => this.isGameActive(game)}
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
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items,
    currentGame: state.currentGame.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats, startGame, joinGame })(Home);