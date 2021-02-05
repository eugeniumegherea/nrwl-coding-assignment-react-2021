import React, { PureComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { AppState } from '../../store/reducers/state';

class Form extends PureComponent<PrivateFormProps> {

  state = {
    name: '',
    description: '',
    assigneeId: null as any as number,
    error: ''
  };

  render() {
    return (
      <div>
        <form onSubmit={ev => this.onSubmit(ev)}>
          <div>
            <input
              disabled={this.props.loading}
              required
              type="text"
              placeholder="Ticket name"
              onChange={ev => this.handleNameChange(ev.target.value)}
            />
          </div>
          <div>
            <textarea
              disabled={this.props.loading}
              placeholder="Description"
              onChange={ev => this.handleDescriptionChange(ev.target.value)}
            />
          </div>

          <div>
            <select
              disabled={this.props.loading}
              onChange={ev => this.handleAssigneeChange(ev.target.value !== '-' ? parseInt(ev.target.value, 10) : null)}
            >
              <option value="-">Unassigned</option>
              {
                this.props.users.map((user) => {
                  return (
                    <option key={user.id + user.name} value={user.id}>{user.name}</option>
                  );
                })
              }
            </select>
          </div>

          <div>
            <button type="submit" disabled={this.props.loading}>Create</button>
          </div>
        </form>
      </div>
    );
  }

  private handleNameChange(name: string) {
    this.setState({ name, error: '' });
  }

  private handleDescriptionChange(description: string) {
    this.setState({ description, error: '' });
  }

  private handleAssigneeChange(assigneeId: number|null) {
    this.setState({ assigneeId, error: '' });
  }

  private onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    ev.stopPropagation();

    if (!this.validate()) {
      return;
    }

    this.props.backend.newTicket({
      name: this.state.name,
      description: this.state.description,
      assigneeId: this.state.assigneeId
    }).subscribe();
  }

  private validate() {
    if (!this.state.name) {
      this.setState({ error: 'Task name is required!' });
      return false;
    }

    return true;
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.loading,
    users: state.users,
    backend: state.backend,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch: dispatch
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PrivateFormProps = ConnectedProps<typeof connector>;

export default connector(Form);
