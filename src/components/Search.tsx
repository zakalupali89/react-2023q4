import { Component, FormEvent } from 'react';
import People from '../types/people.ts';
import ResponseApi from '../types/api.ts';
import { getPeoples } from '../api/people';

const SEARCH = 'search';

type State = {
  prevSearch: string;
  response?: ResponseApi<People>;
};

class Search extends Component<undefined, State> {
  state: State = { prevSearch: '' };

  componentDidMount() {
    const prevSearch = localStorage.getItem(SEARCH) || '';
    this.setState({ prevSearch });
    getPeoples(prevSearch).then((response) => {
      console.log(response);
      this.setState({ response });
    });
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search.value || '';
    localStorage.setItem(SEARCH, value);
    const response = await getPeoples(value);
    this.setState({ response });
  };

  render() {
    return (
      <section className="search-section">
        <form onSubmit={this.handleSubmit}>
          <input name="search" defaultValue={this.state.prevSearch} />
          <button type="submit">Search</button>
        </form>
        <div>{this.state.response?.count || 0}</div>
      </section>
    );
  }
}

export default Search;
