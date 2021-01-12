import React, { useState } from 'react';
import styled from 'styled-components';
import Problem from './Problem'

import {
  Container,
  Header,
  Accordion,
  Icon,
  Divider,
  Message
} from 'semantic-ui-react';

function Exams({ className, ExamData }) {

  const [activeIndex, setActiveIndex] = useState(0)


  function handleClick(e, titleProps) {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  return (
    <div className={className}>

      <Container style={{ marginTop: '7em' }}>
        <Header as='h1'>題目一覽</Header>
        <Divider />

        <Accordion>
          {Object.keys(ExamData).sort((a, b) => { return b - a; }).map((key, i) => {
            return (
              <div key={i}>
              </div>
            )
          })}
        </Accordion>
      </Container>
    </div>
  );
}

export default styled(Exams)`
`;
