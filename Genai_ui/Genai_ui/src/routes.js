import React from 'react';
import { Router, Route } from 'react-router';
import app from './App';
import Agriculture from './Agriculture';

const createRoutes = () => (
    <Router>
      <Route exact path="/sessionstate1" component={app}/>
      <Route exact path="/sessionstate2" component={energy}/>
      {/* /<Route exact path="/sessionstate3" component={Template3}/> */}
    </Router>
);

export default createRoutes;