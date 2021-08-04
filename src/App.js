import React, { createContext, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/jsx/Home';
import About from './components/jsx/About';
import Contact from './components/jsx/Contact';
import Login from './components/jsx/Login';
import Register from './components/jsx/Register';
import Nav from './components/jsx/Nav';
import ForgotPassword from './components/jsx/ForgotPassword';
import EmailVerification from './components/jsx/EmailVerification';
import ResetPassword from './components/jsx/ResetPassword';
import {reducer,initialState} from './components/reducers/Reducer';
import './App.css';

export const userContext = createContext();

function App() {


  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{state,dispatch}}>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/verifyemail/:token' component={EmailVerification} />
          <Route exact path='/resetpassword/:token' component={ResetPassword} />
        </Switch>
      </userContext.Provider>
    </>
  )
}

export default App;
