import { Component } from 'react';
import './App.css';
import Search from './components/Search.tsx';
import Results from './components/Results.tsx';

class App extends Component {
  render() {
    return (
      <div className="home">
        <Search />

        <hr />

        <Results />
      </div>
    );
  }
}

export default App;
