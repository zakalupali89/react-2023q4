import { useEffect, useState } from 'react';
import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import { SEARCH } from '../../consts';
import { getPeoples } from '../../api/people';
import Results from '../../components/results/Results.tsx';
import ButtonError from '../../components/ButtonError.tsx';
import Search from '../../components/search/Search.tsx';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './Home.module.css';
import Loading from '../../components/loader/Loading.tsx';

export default function Home() {
  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseApi<People> | undefined>(undefined);
  const navigate = useNavigate();
  const { name } = useParams();
  const [urlSearchParams] = useSearchParams();
  const page = urlSearchParams.get('page') || '1';
  const search = urlSearchParams.get(SEARCH) || '';

  useEffect(() => {
    const defaultValue = localStorage.getItem(SEARCH) || '';
    setDefaultValue(defaultValue);
    setIsLoading(true);
    getPeoples(defaultValue, page).then((response) => {
      setResponse(response);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setIsLoading(true);
      getPeoples(search, page).then((response) => {
        setResponse(response);
        setIsLoading(false);
      });
    }
  }, [search, page]);

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
          <Search isLoading={isLoading} defaultValue={defaultValue || ''} onChange={handleChange} />

          <ButtonError />
        </section>

        <hr />

        <div className={styles.bottomContainer}>
          {isLoading && <Loading />}
          <Results data={response} />

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
