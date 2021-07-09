import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats, fetchPlayerStats } from '../../actions/statsActions';
import { startGame, joinGame, sendQuestion } from '../../actions/currentGameActions'
import { getHost } from '../../actions/hostActions';
import './home.css';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: ""
        }
    }

    componentDidMount(){
        this.props.fetchStats();
        this.props.fetchGames(this.props.host);
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
                <button onClick={() => this.props.joinGame(this.props.user, game)}>Join game</button>
            ) 
        }
    }

    getHostedGames(){
        let games = [];
        for (let i = 0; i < this.props.games.length; i++){
            if (this.props.games[i].owner == this.props.host.id){
                games.push(this.props.games[i]);
            }
        }
        return games;
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.getHost(this.state.password)
        this.setState({password: ""})
    }

    mapGames(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div class="row" key={game.id}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title game-name">{game.name}</h5>
                        <p class="card-text">{game.description}</p>
                        <p>{game.owner}</p>
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
        let games = this.getHostedGames();
        return games.map(game => (
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
        if (!this.props.host.id){
            return(
                <div>
                    <h3>No host identified. Try again with their login code!</h3>
                    <form onSubmit = {(e) => this.onSubmit(e)} >
                    <div className="form-group d-flex flex-column">
                        <label htmlFor="password">Login Code: </label>
                        <input className="form-rounded form-control" type="text" name="password" onChange={(e) => this.onChange(e)} value={this.state.password} spellCheck="false"/>
                        <button className="btn btn-success" type="submit">Sign Up!</button>
                    </div>
                </form>
                </div>
            )
        }
        let games = this.getHostedGames();
        return games.map(game => (
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
    sendQuestion: PropTypes.func.isRequired,
    getHost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items,
    currentGame: state.currentGame.items,
    host: state.host.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats, startGame, joinGame, sendQuestion, getHost })(Home);