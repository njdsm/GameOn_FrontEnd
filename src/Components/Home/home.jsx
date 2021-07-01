import { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGames } from '../../actions/gameActions';
import { fetchStats } from '../../actions/statsActions';
import './home.css';


class Home extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log("Home Mount");
        this.props.fetchStats();
        this.props.fetchGames();
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

    buttonClick(){
        console.log(this.props.stats);
        console.log(this.props.games);
    }

    render(){
        if (this.props.user){
            return(
                <div>
                    <div className='welcome-banner'>Welcome Back {this.props.user.username}</div>
                    <div className="carousel">
                        Test
                    </div>

                </div>

            )
        }
        else{
            // return(
            //     <div>Welcome to GameOn! Login or SignUp using the links above!</div>
            // )
            return(
                <div>
                        {this.mapGames()}

                    {/* <div class="card-group">
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                            <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                            </div>
                            <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div> */}
                        {/* </div> */}
                </div>

            )
        }
        
    }
}
Home.propTypes = {
    fetchStats: PropTypes.func.isRequired,
    fetchGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    stats: state.stats.items,
    games: state.games.items
});

export default connect(mapStateToProps, { fetchGames, fetchStats })(Home);