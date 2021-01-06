import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer, Home, NoMatch, Problems } from './components';
// import './App.css';
import 'semantic-ui-css/semantic.min.css'
import ExamData from './assets/data.json'


function App() {

  useEffect(()=>{
    console.log(ExamData)
  },[])  

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/problems" component={() => <Problems ExamData={ExamData} />}/>
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
