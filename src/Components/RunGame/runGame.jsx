import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats } from '../../actions/statsActions';
import { fetchPlayerStats } from '../../actions/statsActions';
import './runGame.css';


class RunGame extends Component{
    constructor(props){
        super(props);
    }



    componentDidMount(){
        console.log("Home Mount");
        this.props.fetchGames();
        this.props.getUsers();
        // this.props.fetchPlayerStats();
    }

    render(){
        if (this.props.user.length !== 0 && this.props.user.data.host === true){
            return(
                <div>Host a game!</div>
            );
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
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items,
    user: state.user.items,
    users: state.users.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats })(RunGame);