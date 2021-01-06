import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <>
      <Background>
        <div className="text">404 Not Found</div>
        <Link to={{ pathname: '/' }}>
          <div className="back">🏃 Home Page</div>
        </Link>
      </Background>
    </>
  );
}

const Background = styled.div`
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
