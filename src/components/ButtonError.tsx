import { Component } from 'react';

type State = {
  isError: boolean;
};

export default class ButtonError extends Component<object, State> {
  state = { isError: false };
  handleBreak = () => {
    this.setState({ isError: true });
  };

  componentDidUpdate() {
    console.log(this.state.isError);
    if (this.state.isError) {
      throw new Error('Opsss, something went wrong');
    }
  }

  render() {
    return <button onClick={this.handleBreak}>Break Me Completely</button>;
  }
}
