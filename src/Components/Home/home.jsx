import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats } from '../../actions/statsActions';
import { fetchPlayerStats } from '../../actions/statsActions';
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

    render(){
        return(
            <div>
                {this.mapGames()}
            </div>
        ) 
    }
}

Home.propTypes = {
    fetchStats: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
    fetchPlayerStats: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats, fetchPlayerStats })(Home);