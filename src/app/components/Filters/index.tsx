import React, { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { setFilter } from '../../store/actions';
import { AppState, FILTER_BY } from '../../store/reducers/state'
import { Container, FilterItem, Title } from './styled'

class Filters extends PureComponent<PrivateFilterProps> {

  render() {
    const [filterBy, value] = this.props.filterBy;

    return (
      <Container>
        <Title>
          Quick filters
        </Title>

        <FilterItem>
          <div>Filter by status</div>
          <select
            disabled={this.props.loading}
            onChange={(ev) => this.setStatusFilter(ev.target.value)}
            value={filterBy === FILTER_BY.STATUS ? (value + '') : 'default'}
          >
            <option value="default">All</option>
            <option value="true">Complete</option>
            <option value="false">To Do</option>
          </select>
        </FilterItem>

        <FilterItem>
          <div>Filter by assignee</div>
          <select
            disabled={this.props.loading}
            onChange={(ev) => this.setAssigneeFilter(ev.target.value)}
            value={filterBy === FILTER_BY.ASSIGNEE ? (value + '') : 'default'}
          >
            <option value="default">All</option>
            {
              this.props.users.map((user) => {
                return (
                  <option key={user.id + user.name} value={user.id}>{user.name}</option>
                );
              })
            }
          </select>
        </FilterItem>
      </Container>
    )
  }

  private setStatusFilter(value: string) {
    if (value === 'default') {
      return this.props.dispatch(setFilter(null!, null))
    }
    this.props.dispatch(setFilter(FILTER_BY.STATUS, value === 'true'));
  }

  private setAssigneeFilter(value: string) {
    if (value === 'default') {
      return this.props.dispatch(setFilter(null!, null))
    }
    this.props.dispatch(setFilter(FILTER_BY.ASSIGNEE, value));
  }
}


const mapStateToProps = (state: AppState) => {
  return {
    loading: state.loading,
    users: state.users,
    filterBy: state.filterBy
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch: dispatch
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PrivateFilterProps = ConnectedProps<typeof connector>;

export default connector(Filters);
