import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/search/Search.tsx';
import Results from './components/results/Results.tsx';
import { SEARCH } from './consts';
import { getPeoples } from './api/people';
import ResponseApi from './types/api.ts';
import People from './types/people.ts';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import ButtonError from './components/ButtonError.tsx';

export default function App() {
  const [defaultValue, setDefaultValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseApi<People> | undefined>(undefined);

  useEffect(() => {
    const defaultValue = localStorage.getItem(SEARCH) || '';
    setDefaultValue(defaultValue);
    setIsLoading(true);
    getPeoples(defaultValue).then((response) => {
      setResponse(response);
      setIsLoading(false);
    });
  }, []);

  const handleChange = async (value: string) => {
    localStorage.setItem(SEARCH, value);
    setIsLoading(true);
    const response = await getPeoples(value);
    setResponse(response);
    setIsLoading(false);
  };

  return (
    <ErrorBoundary fallback={<div>Opsss, something went wrong</div>}>
      <div className="container">
        <div className="home">
          <section className="section-search">
            <div>Type name hero from Star war</div>
            <Search isLoading={isLoading} defaultValue={defaultValue} onChange={handleChange} />

            <ButtonError />
          </section>

          <hr />

          <Results isLoading={isLoading} data={response} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
