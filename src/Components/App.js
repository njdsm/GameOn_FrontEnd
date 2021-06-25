import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/home';
import Login from './Login/login';
import NavBar from './NavBar/navbar';
import RegistrationForm from './RegistrationForm/registrationForm'
import { Component } from 'react';


class App extends Component {

  render(){
      return (
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/registration" component={RegistrationForm}/>
          </Switch>
          
        </div>
      );
    }

}

export default App;
