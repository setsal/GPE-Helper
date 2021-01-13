import React, { useReducer } from 'react';
import styled from 'styled-components';

import {
  Container,
  Header,
  Table,
  Rating,
  Message,
  Divider
} from 'semantic-ui-react';
import _ from 'lodash'

const problemReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          column: action.column,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction:
          state.direction === 'ascending' ? 'descending' : 'ascending',
      }
    default:
      throw new Error()
  }
}


function Problems({ className, ProblemData }) {

  const [state, dispatch] = useReducer(problemReducer, {
    column: null,
    data: ProblemData,
    direction: null,
  });

  return (
    <div className={className}>

      <Container style={{ marginTop: '7em' }}>
        <Message>
          <Message.Header>想要排序？</Message.Header>
          <Message.List>
            <Message.Item>點擊欄位名稱就可以了～</Message.Item>
            <Message.Item>目前提供 ProblemID、AC 率、OnSite 次數、題目 Access 次數、歷史出現次數、歷史出現時間排序</Message.Item>
            <Message.Item>另外提供亂算的不負責任題目練習推薦度0 - 0</Message.Item>
          </Message.List>
        </Message>
        <Header as='h1'>題目一覽</Header>
        <Divider />
        <Table sortable celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={state.column === 'pid' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'pid' })}
                singleLine>Problem</Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'rating' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'rating' })}
                textAlign='center'
              >推薦度</Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'AcceptRate' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'AcceptRate' })}
                textAlign='right'
              >
                <Header as='h5'>AcceptRate
            <Header.Subheader>Subs/ACs
            </Header.Subheader>
                </Header>
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'onsite' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'onsite' })}
                textAlign='right'>OnSite</Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'access' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'access' })}
                textAlign='right'>Access</Table.HeaderCell>
              <Table.HeaderCell width={1} 
                sorted={state.column === 'Appearance' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'Appearance' })}
                textAlign='right'>Appearance</Table.HeaderCell>                  
              <Table.HeaderCell width={2} 
                sorted={state.column === 'LastAppearance' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'LastAppearance' })}
                textAlign='right'>LastAppearance</Table.HeaderCell>                
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {state.data.map((problem, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell singleLine>
                    <a href={`https://gpe3.acm-icpc.tw/showproblemtab.php?probid=${problem.pid}&cid=5\n`} rel="noreferrer" target="_blank">{problem.name}</a>
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Rating rating={problem.rating} maxRating={3} />
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    <Header as='h5'>{problem.AcceptRate}%
                      <Header.Subheader>{problem.ACs}/{problem.subs}
                      </Header.Subheader>
                    </Header>
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {problem.onsite}
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {problem.access}
                  </Table.Cell>
                  <Table.Cell textAlign='right'>
                    {problem.Appearance}
                  </Table.Cell>                   
                  <Table.Cell textAlign='right'>
                    {problem.LastAppearance}
                  </Table.Cell>                  
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
}

export default styled(Problems)`
`;
