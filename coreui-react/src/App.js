import React, { Component } from 'react';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Routes from "./Routes"
import {Provider} from "react-redux"
import store from "./Redux/Store"
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  
  render() {
    toast.configure();
    return (
      <Provider store = {store}>
          <ToastContainer/>
          <Routes/>
      </Provider>
    
    );
  }
}

export default App;
