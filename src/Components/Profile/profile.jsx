import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { redeemPoints } from '../../actions/authActions';
import axios from 'axios'
import './profile.css';
import { sendQuestion } from "../../actions/currentGameActions";


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            playerStats: [],
            render: "Loading",
            wins: 0,
            amount: "",
            points: this.props.user.points
        }
        this.fetchPlayerStats(this.props.user)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    fetchPlayerStats(user){
        axios.get("http://127.0.0.1:8000/stats/?player_id=" + user.id + "/").then(
            stats => {
                this.setState({playerStats: stats}, () => this.setStateForRender());
            }
        )
    }

    setStateForRender(){
        this.setState({render: this.mapGames()});
    }

    gameStatCheck(stat, game){
        try{
            if (stat.game === game.id && stat.player === this.props.user.id){
                if (stat.placement === 1){
                    this.state.wins = this.state.wins + 1
                }

                return(
                    <tr>
                        <td>Placement</td>
                        <td>{stat.placement}</td>
                    </tr>
                )
            }
        }
        catch{
            return
        }
    }

    mapGames(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div>{game.name}
                <table className="table table-dark">
                    <tr>
                    </tr>
                    {this.state.playerStats.data.map(stat => (
                        this.gameStatCheck(stat, game)
                    ))}
                </table>
            </div>
        ));
    }

    redeemPoints(amount){
        console.log(this.state.amount)
        amount = parseInt(amount)
        if (isNaN(amount)){
            alert("Please enter a valid number.")
        }
        else if (amount <= this.props.user.points){
            this.props.user.points -= amount;
            this.setState({points: this.props.user.points})
            this.props.redeemPoints(this.props.user);
            let payload = {"REDEEM": amount}
            this.props.sendQuestion(payload, this.props.user)
        }
        else{
            alert("You don't have that many points brother!")
        }
        console.log(this.props.user.points)
    }

    render(){
        return(
            <div>
                <h1>{this.props.user.user_name}'s profile</h1>
                <h3>Reward Points: {this.state.points}</h3>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Redeem Points
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title modal-text" id="exampleModalLabel">Redeem Points</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p className="modal-text">How many points would you like to redeem at this time?</p>
                                <input type="text" name="amount" id="redeem" onChange={(e) => this.onChange(e)} value={this.state.amount}/>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={() => this.redeemPoints(this.state.amount)} data-dismiss="modal" class="btn btn-primary">Redeem</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                {this.state.render}
                <h5>Overall Wins: {this.state.wins}</h5>
            </div>
            )
        }    
    }


Profile.propTypes = {
    fetchGames: PropTypes.func.isRequired,
    redeemPoints: PropTypes.func.isRequired,
    sendQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    games: state.games.items,
    user: state.user.items
});

export default connect(mapStateToProps, { fetchGames, redeemPoints, sendQuestion })(Profile);