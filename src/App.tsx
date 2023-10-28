import { Component } from 'react';
import './App.css';
import Search from './components/search/Search.tsx';
import Results from './components/results/Results.tsx';
import { SEARCH } from './consts';
import { getPeoples } from './api/people';
import ResponseApi from './types/api.ts';
import People from './types/people.ts';

type State = {
  defaultValue: string;
  isLoading: boolean;
  response?: ResponseApi<People>;
};

class App extends Component<object, State> {
  state: State = { defaultValue: '', isLoading: false };

  componentDidMount() {
    const defaultValue = localStorage.getItem(SEARCH) || '';
    this.setState({ defaultValue, isLoading: true });
    getPeoples(defaultValue).then((response) => this.setState({ response, isLoading: false }));
  }

  handleChange = async (value: string) => {
    localStorage.setItem(SEARCH, value);
    this.setState({ isLoading: true, response: undefined });
    const response = await getPeoples(value);
    this.setState({ response, isLoading: false });
  };

  render() {
    return (
      <div className="container">
        <div className="home">
          <section className="section-search">
            <div>Type name hero from Star war</div>
            <Search
              isLoading={this.state.isLoading}
              defaultValue={this.state.defaultValue}
              onChange={this.handleChange}
            />
          </section>

          <hr />

          <Results isLoading={this.state.isLoading} data={this.state.response} />
        </div>
      </div>
    );
  }
}

export default App;
