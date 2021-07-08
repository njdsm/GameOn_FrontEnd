import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/home';
import Login from './Components/Login/login';
import NavBar from './Components/NavBar/navbar';
import Profile from './Components/Profile/profile';
import RunGame from './Components/RunGame/runGame';
import RegistrationForm from './Components/RegistrationForm/registrationForm'
import { Component } from 'react';
import store from './store';
import createGame from './Components/CreateGame/createGame';
import RegisterHost from './Components/RegisterHost/registerHost';


class App extends Component {

    render(){
        return (
            <div className="App">
                <Provider store={store}>
                    <NavBar/>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/registration" component={RegistrationForm}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/active_game" component={RunGame}/>
                        <Route path="/create_game" component={createGame}/>
                        <Route path="/become_host" component={RegisterHost}/>
                    </Switch>
                </Provider>
            </div>
        );
    };
}

export default App;
