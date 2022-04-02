import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';

import {
  Container,
  Header,
  Table,
  Rating,
  Message,
  Divider,
  Input,
  Button,
  Icon,
  Label,
} from 'semantic-ui-react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

const problemReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          column: action.column,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]).reverse(),
        direction: 'descending',
      };
    case 'CHANGE_FILTER':
      return {
        data: action.data,
      };
    case 'ADD_FAVORITE': {
      return {
        ...state,
        data: state.data.map((item, i) => (i === action.index
          ? { ...item, favorite: item.favorite ? 0 : 1 }
          : item)),
      };
    }
    default:
      throw new Error();
  }
};

function Problems({ className, ProblemData }) {
  const [state, dispatch] = useReducer(problemReducer, {
    column: null,
    data: ProblemData,
    direction: null,
    filter: undefined,
  });

  const handleFilter = useCallback((e) => {
    state.filter = e.target.value;
    dispatch({
      type: 'CHANGE_FILTER',
      data: ProblemData.filter((problems) => problems.name.includes(state.filter)),
    });
  });
  const history = useHistory();
  const navigateTo = (pid) => history.push(`/problems/${pid}`);

  function addFavorite(pid) {
    const pidData = JSON.parse(localStorage.getItem('gpe-favorite'));
    let pidList;
    if (pidData) {
      pidList = pidData;
    } else {
      pidList = [];
    }

    if (pidList.includes(pid)) {
      pidList = pidList.filter((value) => value !== pid);
    } else {
      pidList.push(pid);
    }
    localStorage.setItem('gpe-favorite', JSON.stringify(pidList));
  }

  return (
    <div className={className}>

      <Container style={{ marginTop: '6em' }}>
        <Message>
          <Message.Header>想要排序?</Message.Header>
          <Message.List>
            <Message.Item>點擊欄位名稱就可以了～</Message.Item>
            <Message.Item>
              目前提供 ProblemID、AC 率、OnSite 次數、題目 Access 次數、2019~現在正式考試出現次數、最後出現時間排序
            </Message.Item>
            <Message.Item>另外提供亂統計的不負責任題目練習推薦度0 - 0</Message.Item>
            <Message.Item>P.S. 純前端網站，我的最愛功能透過瀏覽器儲存實現，如果你清掉資料或換台電腦，我的最愛就會消失囉😌</Message.Item>
          </Message.List>
        </Message>

        <div style={{ padding: '10px 0 35px 0' }}>
          <Header as="h1" style={{ float: 'left' }}>
            <Icon name="rocket" />
            題目一覽
          </Header>
          <Input
            placeholder="Enter Problem Name"
            name="filter"
            onChange={handleFilter}
            icon="search"
            style={{ float: 'right' }}
          />
        </div>
        <Divider />
        <Table sortable celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={1}
                sorted={state.column === 'pid' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'favorite' })}
              >
                Snapshot
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'pid' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'pid' })}
                singleLine
              >
                Problem
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'rating' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'rating' })}
                textAlign="center"
              >
                推薦度
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'AcceptRate' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'AcceptRate' })}
                textAlign="right"
              >
                <Header as="h5">
                  AcceptRate
                  <Header.Subheader>
                    ACs/Subs
                  </Header.Subheader>
                </Header>
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'onsite' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'onsite' })}
                textAlign="right"
              >
                OnSite
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={state.column === 'access' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'access' })}
                textAlign="right"
              >
                Access
              </Table.HeaderCell>
              <Table.HeaderCell
                width={1}
                sorted={state.column === 'Appearance' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'Appearance' })}
                textAlign="right"
              >
                Appearance
              </Table.HeaderCell>
              <Table.HeaderCell
                width={2}
                sorted={state.column === 'LastAppearance' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'LastAppearance' })}
                textAlign="right"
              >
                LastAppearance
              </Table.HeaderCell>
              <Table.HeaderCell
                width={1}
                sorted={state.column === 'favorite' ? state.direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'favorite' })}
              >
                Favorite
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {state.data
              && state.data.map((problem, i) => (
                <Table.Row key={problem.pid}>
                  <Table.Cell textAlign="center">
                    <Button
                      onClick={() => {
                        navigateTo(problem.pid);
                      }}
                      color="orange"
                      icon="save outline"
                    />
                  </Table.Cell>
                  <Table.Cell singleLine>
                    <a className="problem-name" href={`https://gpe3.acm-icpc.tw/showproblemtab.php?probid=${problem.pid}&cid=5\n`} rel="noreferrer" target="_blank">{problem.name}</a>
                      &nbsp;&nbsp;
                    <div className="category">
                      {problem.category.map((item) => (
                        <Label circular size="small" key={item}>
                          {item}
                          {' '}
                        </Label>
                      ))}
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Rating rating={problem.rating} maxRating={3} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    <Header as="h5">
                      {problem.AcceptRate}
                      %
                      <Header.Subheader>
                        {problem.ACs}
                        /
                        {problem.subs}
                      </Header.Subheader>
                    </Header>
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {problem.onsite}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {problem.access}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {problem.Appearance}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {problem.LastAppearance}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      onClick={() => {
                        addFavorite(problem.pid);
                        dispatch({ type: 'ADD_FAVORITE', index: i });
                      }}
                      color={problem.favorite ? 'google plus' : 'twitter'}
                      icon={problem.favorite ? 'heart' : 'heart outline'}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Container>
    </div>
  );
}

export default styled(Problems)`
.problem-name {
  font-size: 1.1rem;
  font-weight: 500;
}
.category {
  display: inline;
}
`;
