import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
} from 'semantic-ui-react';

function NoMatch() {
  return (
    <>
      <Background>
        <Container style={{ marginTop: '6em' }} textAlign="center">
          <Header as="h2" className="text" style={{ fontSize: '80px' }}>404 Not Found</Header>
          <Link to={{ pathname: '/' }}>
            <div className="back">🏃 Home Page</div>
          </Link>
        </Container>
      </Background>
    </>
  );
}

const Background = styled.div`
  margin-top: 200px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .text {
    font-weight: 700;
    font-size: 80px;
  }
  .back {
    line-height: 50px;
    color: black;
  }
`;

export default NoMatch;
