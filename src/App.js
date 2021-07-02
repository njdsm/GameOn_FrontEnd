import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/home';
import Login from './Components/Login/login';
import NavBar from './Components/NavBar/navbar';
import Profile from './Components/Profile/profile';
import RegistrationForm from './Components/RegistrationForm/registrationForm'
import { Component } from 'react';
import store from './store';


class App extends Component {

    buttonClick(){
        console.log(store.getState())
    }

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
                    </Switch>
                    <button onClick={() => this.buttonClick()}>Test</button>
                </Provider>
            </div>
        );
    };
}

export default App;
