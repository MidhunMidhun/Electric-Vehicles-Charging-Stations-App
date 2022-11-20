import React from 'react';

import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import login from './components/pages/login';
import Adminmap from './components/pages/Adminmap';
import Maparea from './components/Maparea';


function App() {
  return (
    <>
      <Router>
        
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/login' component={login} />
          <Route path='/Adminmap' component={Adminmap} />
          <Route path='/maparea' component={Maparea} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
