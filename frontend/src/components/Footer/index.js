import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import ScrollTop from './ScrollTop';
import {
  Container,
  Divider,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

function Footer({ className }) {
  const [nearTop, setNearTop] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      setNearTop(window.pageYOffset < 150);
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function onScrollTop() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={className}>
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Divider inverted section />
        <Image centered size='mini' src='/logo192.png' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Github Repo
          </List.Item>
          <List.Item as='a' href='#'>
          LICENSE
          </List.Item>
        </List>
      </Container>
    </Segment>
      <ScrollTop onClick={onScrollTop} show={!nearTop} />
    </div>
  );
}

export default styled(Footer)`
`;
