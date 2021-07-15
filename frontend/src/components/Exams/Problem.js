import React, { useReducer } from 'react';
import styled from 'styled-components';
import {
  Header,
  Table,
  Label,
} from 'semantic-ui-react';
import _ from 'lodash';

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
    default:
      throw new Error();
  }
};

const Problem = ({
  className, problems,
}) => {
  const [state, dispatch] = useReducer(problemReducer, {
    column: null,
    data: problems,
    direction: null,
  });

  return (
    <div className={className}>
      <Table sortable celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Problem</Table.HeaderCell>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.data.map((problem) => (
            <Table.Row key={problem.pid}>
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default styled(Problem)`
.problem-name {
  font-size: 1.1rem;
  font-weight: 500;
}
.category {
  display: inline;
}
`;
