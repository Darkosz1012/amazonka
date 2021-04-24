import React, { useState } from 'react';
import '../node_modules/jquery/src/jquery'; 
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPanel from './components/LoginPanel/LoginPanel';
import CompetitionList from './components/CompetitionList/CompetitionList';

function App(){
    return(
      <div>
        <Layout>
          <Switch>
            {/* <Route path="/competitions" component={CompetitionsList}/>
            <Route path="/competitors" component={CompetitorsList}/>
            <Route path="/score" component={AddScore}/> */}
            <Route path="/competitions" component={CompetitionList}/>
            <Route path="/login" component={LoginPanel}/>
            <Route path="/" exact component={LoginPanel}/>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    )
  
}

export default App;
