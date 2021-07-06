import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import axios from 'axios'
import './profile.css';


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            playerStats: [],
            render: "Loading",
            wins: 0
        }
        this.fetchPlayerStats(this.props.user)
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

    render(){
        return(
            <div>
                {this.state.render}
                <h5>Overall Wins: {this.state.wins}</h5>
            </div>
            )
        }    
    }


Profile.propTypes = {
    fetchGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    games: state.games.items,
    user: state.user.items
});

export default connect(mapStateToProps, { fetchGames })(Profile);