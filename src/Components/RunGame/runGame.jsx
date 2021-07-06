import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats } from '../../actions/statsActions';
import { fetchPlayerStats } from '../../actions/statsActions';
import { getUsers } from '../../actions/authActions';
import { sendQuestion } from '../../actions/currentGameActions';
import axios from 'axios';
import './runGame.css';


class RunGame extends Component{
    constructor(props){
        super(props);
        this.state={
            question: '',
            answers: []
        }
    }

    componentDidMount(){
        console.log("Home Mount");
        this.props.fetchGames();
        this.props.getUsers();
        // this.props.fetchPlayerStats();
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const question = {
            question: this.state.question,
        }
        this.props.sendQuestion(question);
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

    correct(answer){
        this.deleteAnswer(answer)
        let newPhone = answer.phone
        newPhone = newPhone.slice(2, 12)
        console.log(newPhone)
        this.mapAnswerToUser(newPhone)
    }

    mapAnswerToUser(phone){
        debugger
        let player = this.props.users.map((user) => {
            if (user.phone === phone){
                user.score += 1;
            }
        })
        
    }

    render(){
        if (this.props.user.length !== 0 && this.props.user.host === true){
            if (this.props.currentGame){
                return(
                    <div>
                        {this.props.currentGame.data.name}
                        <div>ScoreBoard
                            <table className="table table-dark">
                                <tr>
                                    <td>Player</td>
                                    <td>Score</td>
                                </tr>
                                {this.props.users.map(user => (
                                <tr>
                                    <td>{user.user_name}</td>
                                    <td>{user.score}</td>
                                </tr>
                            ))}
                            </table>
                            
                        </div>
                        <form onSubmit={(e) => this.onSubmit(e)}>
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
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <div>Active Game!</div>
                    </div>
                );
            }
        }
    
        else if (this.props.user.length !== 0 ){
            return(
                <div>Play a Game!</div>
            );
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
    sendQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items,
    currentGame: state.currentGame.items,
    players: state.players.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats, getUsers, sendQuestion })(RunGame);