import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import {
  Container,
  Header,
  Accordion, 
  Icon
} from 'semantic-ui-react';

function Problems({ className, ExamData }) {

  // const [ExamData, setExamData] = useState(ExamData)

  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(()=>{
    console.log('123')
    console.log(ExamData)
  },[]) 
  
  function handleClick(index) {
    setActiveIndex(index)
  }

  return (
    <div className={className}>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>題目一覽</Header>
      <Accordion>
        {Object.keys(ExamData).map((key, i) =>{
            return (
              <p key={i}>
                aaa
              </p>
            );
          })}
      </Accordion>
    </Container>
    </div>
  );
}

export default styled(Problems)`
`;
