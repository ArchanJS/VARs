import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/jsx/Home';
import About from './components/jsx/About';
import Contact from './components/jsx/Contact';
import Login from './components/jsx/Login';
import Register from './components/jsx/Register';
import Nav from './components/jsx/Nav';
import './App.css';

function App() {
  return (
    <>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    </>
  )
}

export default App;
