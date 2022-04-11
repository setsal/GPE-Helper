import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga'; // Google Analytics
import {
  Header, Footer, Home, NoMatch, Exams, Problems, ProblemSnapshots,
} from './components';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [data, setData] = useState({
    ExamData: null,
    ProblemData: null,
  });

  const fetchData = () => {
    Promise.all([
      fetch('/exams.json'),
      fetch('/problems.json'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const pidData = JSON.parse(localStorage.getItem('gpe-favorite'));
        if (pidData) {
          pidData.forEach((pid) => {
            const found = data2.find((s) => s.pid === pid); // 方便但效能好差 XD
            if (found) {
              found.favorite = 1;
            }
          });
        }
        setData({ ExamData: data1, ProblemData: data2 });
      }).catch((error) => {
        console.log(error);
        console.log('Fetch Data Error!');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    ReactGA.initialize('UA-143810313-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <Router>
      <div id="myContainer">
        <Header />
        <div id="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/exams" component={() => <Exams ExamData={data.ExamData} />} />
            <Route exact path="/problems" component={() => <Problems ProblemData={data.ProblemData} />} />
            <Route path="/problems/:id" component={() => <ProblemSnapshots />} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
