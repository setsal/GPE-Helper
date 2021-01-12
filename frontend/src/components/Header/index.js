import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import {
  Container,
  Dropdown,
  Menu,
  Icon
} from 'semantic-ui-react';

function Header({ className }) {

  return (
    <div className={className}>
      <Menu fixed='top' inverted size='large'>
        <Container>
          <Menu.Item as={Link} header to='/'>
            {/* <Image size='mini' src='/logo192.png' style={{ marginRight: '1.5em' }} /> */}
            <Icon name='ambulance' style={{ marginRight: '1.5em' }} />
          GPE Helper
        </Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown item simple text='功能選單'>
              <Dropdown.Menu >
                <Dropdown.Item as={Link} to='/exams'>考試一覽</Dropdown.Item>
                <Dropdown.Item as={Link} to='/problems'>題目一覽</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>關於專案 & 窩</Dropdown.Header>
                <Dropdown.Item>Github Repo</Dropdown.Item>
                <Dropdown.Item>
                  <Icon name='dropdown' />
                  <span className='text'>Also Try</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>fake-phone-screen</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}

export default styled(Header)`
`;
