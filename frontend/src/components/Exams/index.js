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
        <Message>
          <Message.Header>想要排序？</Message.Header>
          <Message.List>
            <Message.Item>點擊欄位名稱就可以了～</Message.Item>
            <Message.Item>目前提供 AC 率、OnSite 次數、題目 Access 次數排序</Message.Item>
          </Message.List>
        </Message>
        <Header as='h1'><Icon name='flag checkered' />考試一覽</Header>
        <Divider />

        <Accordion>
          {ExamData &&
            Object.keys(ExamData).sort((a, b) => { return b - a; }).map((key, i) => {
              return (
                <div key={i}>
                  <Accordion.Title
                    active={activeIndex === i}
                    index={i}
                    onClick={handleClick}
                  >
                    <Icon name='dropdown' />
                    {ExamData[key].examTime}: {ExamData[key].examName}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i} style={{ padding: '1rem 2rem' }}>
                    <Problem problems={ExamData[key].problems} />
                  </Accordion.Content>
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
