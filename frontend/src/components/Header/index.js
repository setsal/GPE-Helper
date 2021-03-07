import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Container,
  Dropdown,
  Menu,
  Icon,
} from 'semantic-ui-react';

function Header({ className }) {
  const [githubData, setGithubData] = useState({
    stargazers_count: 0,
    forks_count: 0,
  });

  const fetchData = async () => {
    fetch('https://api.github.com/users/setsal/repos?per_page=100&sort=updated&page=0')
      .then((response) => response.json())
      .then((data) => {
        if (!(data instanceof Array)) return [];

        /* Display number of stars and forks, if repository is given */
        const repo = data.find((item) => item.name === 'GPE-Helper');
        if (repo) {
          if (typeof repo.stargazers_count !== 'number' || typeof repo.forks_count !== 'number') return [];
          setGithubData({
            ...githubData,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
          });
        }
        return [];
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={className}>
      <Menu fixed="top" inverted size="large">
        <Container>
          <Menu.Item as={Link} header to="/">
            <Icon name="ambulance" style={{ marginRight: '1.5em' }} />
            GPE Helper
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item simple text="功能選單">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/problems">題目一覽</Dropdown.Item>
                <Dropdown.Item as={Link} to="/exams">考試一覽</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>關於專案 & 窩</Dropdown.Header>
                <Dropdown.Item as="a" href="https://github.com/setsal/GPE-Helper" target="_blank">Github Repo</Dropdown.Item>
                <Dropdown.Item as="a" href="https://blog.setsal.dev/gpe-helper/" target="_blank">開發歷程</Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="dropdown" />
                  <span className="text">Also Try</span>
                  <Dropdown.Menu>
                    <Dropdown.Item as="a" href="https://fake-phone-screen.netlify.app/" target="_blank">fake-phone-screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Item as="a" href="https://github.com/setsal/GPE-Helper" className="navbar-item github-source" style={{ lineHeight: '1.5' }} target="_blank">
            <div className="github-source-icon"><Icon name="github alternate" /></div>
            <div className="github-source-repository">
              setsal/GPE-Helper
              <ul className="github-facts">
                <li className="github-stars">
                  {githubData.stargazers_count}
                  {' '}
                  Stars
                </li>
                <li className="github-forks" style={{ marginLeft: '3px' }}>
                  •
                  {' '}
                  {githubData.forks_count}
                  {' '}
                  Forks
                </li>
              </ul>
            </div>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

const animateElement = keyframes`
  0% {
    opacity:0;
    transform:  translate(0px,10px);
  }
  100% {
    opacity:1;
    transform:  translate(0px,0px);
  }
`;

export default styled(Header)`
.github-source {
  .github-source-icon {
        padding: 5px;
  }
  .github-source-repository {
      padding-left: 5px;
      font-size: 10px;
      font-weight: 1000;
      ul {
        list-style: none;
        animation: ${animateElement} linear .3s;
        animation-iteration-count: 1;
        margin: 0;
        padding: 0;
        li {
          float: left;
          font-weight: 200;
        }
      }
  } 
}
`;
