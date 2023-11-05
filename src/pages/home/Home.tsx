import { useEffect, useState } from 'react';
import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import { SEARCH } from '../../consts';
import { getPeoples } from '../../api/people';
import Results from '../../components/results/Results.tsx';
import ButtonError from '../../components/ButtonError.tsx';
import Search from '../../components/search/Search.tsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const [defaultValue, setDefaultValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseApi<People> | undefined>(undefined);
  const navigate = useNavigate();
  const { name } = useParams();

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

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="home">
        <section className={styles.sectionSearch}>
          <div>Type name hero from Star war</div>
          <Search isLoading={isLoading} defaultValue={defaultValue} onChange={handleChange} />

          <ButtonError />
        </section>

        <hr />

        <div className={styles.bottomContainer}>
          <Results isLoading={isLoading} data={response} />

          <section
            className={styles.detail}
            style={{ width: name ? '30%' : 0, overflow: 'hidden' }}
          >
            <button className={styles.close} onClick={handleClose}>
              Close
            </button>
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
}
