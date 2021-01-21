import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer, Home, NoMatch, Exams, Problems } from './components';
import './App.css';
import 'semantic-ui-css/semantic.min.css'


function App() {

  const [data, setData] = useState({
    ExamData: null,
    ProblemData: null,
  })

  useEffect(() => {
    console.log('fetch data')
    fetchData();
  }, [])

  const fetchData = () => {
    Promise.all([
      fetch('/exams.json'),
      fetch('/problems.json')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        var pidData = JSON.parse(localStorage.getItem('gpe-favorite'));
        if (pidData) {
          pidData.forEach(pid => {
            var found = data2.find(s => s['pid'] === pid); // 方便但效能好差 XD
            if (found) {
              found['favorite'] = 1
            }
            return
          });
        }
        setData({ ExamData: data1, ProblemData: data2 });
      }).catch(function (error) {
        console.log(error);
        console.log('Fetch Data Error!')
      });
  }

  return (
    <Router>
      <div id="myContainer">
        <Header />
        <div id="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/exams" component={() => <Exams ExamData={data.ExamData} />} />
            <Route path="/problems" component={() => <Problems ProblemData={data.ProblemData} />} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
