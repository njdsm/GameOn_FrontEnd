import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/home';
import Login from './Login/login';
import NavBar from './NavBar/navbar';
import RegistrationForm from './RegistrationForm/registrationForm'
import { Component } from 'react';
import axios from 'axios';


class App extends Component {

  registerUser = async(userReg) => {
    console.log("passed reg param", userReg)
    try {
        let {data} = await axios.post('http//127.0.0.1:8000/users/', userReg);
        console.log('registered post', data);
        debugger;
        this.loginUser({UserName:userReg.UserName,Password:userReg.Password})
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
  }

  loginUser = async(user) => {
    console.log("attempting login");
    try{
      let {data} = await axios.post('http://127.0.0.1:8000/api/token/', user)
      console.log('logged in', data);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
  }

  render(){
      return (
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route  
                path="/login" 
                render={(props) => (
                  <Login loginUser={(user) => this.loginUser(user)}/>
                )}
            />
            <Route 
                path="/registration" 
                render={(props) => (
                  <RegistrationForm registerUser={(regUser) => this.registerUser(regUser)} />
                )}
            />
          </Switch>
        </div>
      );
    };

}

export default App;
