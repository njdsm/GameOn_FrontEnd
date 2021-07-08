import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats } from '../../actions/statsActions';
import { fetchPlayerStats } from '../../actions/statsActions';
import { getUsers } from '../../actions/authActions';
import { sendQuestion } from '../../actions/currentGameActions';
import { endGame } from '../../actions/currentGameActions';
import axios from 'axios';
import _ from 'underscore';
import './runGame.css';


class RunGame extends Component{
    constructor(props){
        super(props);
        this.state={
            question: '',
            answers: [],
            players: [],
        }
        this.props.fetchGames()
        this.props.getUsers()
    }

    componentDidMount(){
        this.props.fetchGames();
        this.props.getUsers();
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isPlaying(user, game){
        return user.is_playing === game.id;
    }

    onSubmit(e, game){
        e.preventDefault();
        const question = {
            question: this.state.question,
        }
        this.props.users.map((player) => {
            if (this.isPlaying(player, game)){
                this.props.sendQuestion(question, player)
            }
        })
        this.setState({question: ""})
    }

    getAnswers(){
        axios.get('http://127.0.0.1:8000/current_game/answers/').then(
            answers => {
                this.setState({answers: answers.data})
            }
        )
    }

    deleteAnswer(answer){
        axios.delete("http://127.0.0.1:8000/current_game/answers/" + answer.id + "/").then(
            this.setState({answers: this.state.answers.filter(function(answerRemove) { 
                return answerRemove !== answer 
            })})
        )
    }

    incorrect(answer){
        this.deleteAnswer(answer)
    }

    correct(answer){
        this.deleteAnswer(answer)
        let newPhone = answer.phone
        newPhone = newPhone.slice(2, 12)
        console.log(newPhone)
        this.mapAnswerToUser(newPhone)
    }

    mapAnswerToUser(phone){
        let player = this.props.users.map((user) => {
            if (user.phone === phone){
                user.score += 1;
            }
        })
    }

    createNewStat(stat){
        axios.post("http://127.0.0.1:8000/stats/", stat)
    }

    addPoints(user){
        user.points += 100
        axios.put("http://127.0.0.1:8000/users/" + user.id + "/", user)
    }

    endGame(game){
        let users = this.props.users.map((player) => {
            if (this.isPlaying(player, game)){
                player.is_playing = 0;
                player.score = 0;
                axios.put("http://127.0.0.1:8000/users/" + player.id + "/", player)
                return player;
            }
            else {
                return null
            }
        }).filter(function(user) {
            return user !== null
        })
        var sortedUsers = _.sortBy( users, 'points' );
        for (let i = sortedUsers.length -1; i >= 0; i--) {
            let newStat = {
                "placement": sortedUsers.length - i,
                "game": game.id,
                "player": sortedUsers[i].id
            };
            if (newStat.placement == 1){
                this.addPoints(sortedUsers[i])
            }
            this.createNewStat(newStat);
        }
        this.props.endGame(game)
    }

    scoreboardRender(user, game){
        if (user.is_playing === game.id){
            return (
                <tr>
                    <td>{user.user_name}</td>
                    <td>{user.score}</td>
                </tr>
            )
        }
    }

    hostRender(game){
        if (game.is_active === true){
            return (
                <div>
                    {game.name}
                    <div>ScoreBoard
                        <table className="table table-dark">
                            <tr>
                                <td>Player</td>
                                <td>Score</td>
                            </tr>
                            {this.props.users.map(user => (
                                this.scoreboardRender(user, game)
                            ))}
                        </table>
                    </div>
                    <form onSubmit={(e) => this.onSubmit(e, game)}>
                        <h1>Question: </h1>
                        <input type="text" name="question" id="question" onChange={(e) => this.onChange(e)} value={this.state.question}/>
                        <button type="submit">Send</button>
                    </form>
                    <div>
                        Answers
                        <div>
                            {this.state.answers.map(answer => (
                                <div class="row" key={answer.id}>
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title game-name">{answer.phone}</h5>
                                            <p class="card-text">{answer.answer}</p>
                                        </div>
                                        <button onClick={() => this.correct(answer)} className="btn btn-success">Correct</button>
                                        <button onClick={() => this.incorrect(answer)} className="btn btn-danger">Incorrect</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => this.getAnswers()} >Get Answers</button>
                        <button onClick={() => this.endGame(game)}>End Game</button>
                    </div>
                </div>
            )
        }
    }

    playerRender(game){
        if (game.id === this.props.user.is_playing){
            return(
                <div>
                    <div>Active Game!</div>
                    {game.name}
                    <div>ScoreBoard
                        <table className="table table-dark">
                            <tr>
                                <td>Player</td>
                                <td>Score</td>
                            </tr>
                            {this.props.users.map(user => (
                                this.scoreboardRender(user, game)
                            ))}
                        </table>
                    </div>
                </div>
            );
        }
    }

    render(){
        if (this.props.user.length !== 0 && this.props.user.host === true){
            return (
                <div>
                    {this.props.games.map(game => (
                        this.hostRender(game)
                    ))} 
                </div>
            )
        }
        else if (this.props.user.length !== 0){
            return (
                <div>
                    {this.props.games.map(game => (
                        this.playerRender(game)
                    ))}
                </div>
            )
        }
        else {
            return(
                <div>Login to join a game!</div>
            );
        }
    }
}

RunGame.propTypes = {
    fetchStats: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
    fetchPlayerStats: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    sendQuestion: PropTypes.func.isRequired,
    endGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items,
    currentGame: state.currentGame.items,
    players: state.players.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats, getUsers, sendQuestion, endGame })(RunGame);