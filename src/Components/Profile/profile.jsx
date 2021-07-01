import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchPlayerStats } from '../../actions/statsActions';
import './profile.css';


class Profile extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Profile Mount");
        // this.props.fetchPlayerStats(this.props.user);
        this.props.fetchGames();
    }

    mapGames(){
        console.log("games items", this.props.games);
        return this.props.games.map(game => (
            <div>
                <table>
                    <tr>
                        <td>Game Name</td>
                        <td>Wins</td>
                        <td>Average Placement</td>
                    </tr>
                    <tr>
                        <td>{game.name}</td>
                        <td>placeholder</td>
                        <td>placeholder</td>
                    </tr>
                </table>
            </div>
        ));
    }

    render(){
        return(
            <div>
                {this.mapGames()}
            </div>
            )
        }    
    }


Profile.propTypes = {
    fetchPlayerStats: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // playerStats: state.playerStats.items,
    games: state.games.items
});

export default connect(mapStateToProps, { fetchGames, fetchPlayerStats })(Profile);