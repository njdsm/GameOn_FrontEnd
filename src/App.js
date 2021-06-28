import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Components/Home/home';
import Login from './Components/Login/login';
import NavBar from './Components/NavBar/navbar';
import RegistrationForm from './Components/RegistrationForm/registrationForm'
import { Component } from 'react';
import axios from 'axios';
import store from './store';


class App extends Component {

  registerUser = async(userReg) => {
    console.log("passed reg param", userReg)
    debugger;

    try {
        let {data} = await axios.post('http://127.0.0.1:8000/users/', userReg);
        console.log('registered post', data);
        this.loginUser({UserName:userReg.UserName,Password:userReg.Password})
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
  }

  loginUser = async(user) => {
    console.log("attempting login");
    debugger
    try{
      let {data} = await axios.post('http://127.0.0.1:8000/users/login/', user)
      console.log('logged in', data);
      localStorage.setItem('token', data.token);
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
  }

  render(){
      return (
        <div className="App">
          <Provider store={store}>
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
          </Provider>
        </div>
      );
    };

}

export default App;
