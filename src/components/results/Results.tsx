import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import DescriptionField from '../description-field/DescriptionField.tsx';
import styles from './Results.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MouseEvent } from 'react';

type Props = {
  data: ResponseApi<People> | undefined;
};

export default function Results(props: Props) {
  const { data } = props;
  const { next, previous } = data || {};
  const navigate = useNavigate();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = parseInt(urlSearchParams.get('page') || '1', 10);
  const handleClick = (id: string) => {
    const slugName = id.replace(' ', '-');
    navigate(`/detail/${slugName}`);
  };

  const handleChangePage = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.direction === 'prev' && previous) {
      setUrlSearchParams(`page=${page - 1}`);
    }
    if (target.dataset.direction === 'next' && next) {
      setUrlSearchParams(`page=${page + 1}`);
    }
  };

  return (
    <section className={styles.container} style={{ position: 'relative' }}>
      {data?.results.length ? (
        <div className={styles.container}>
          <div className={styles.results}>
            {data.results.map((people) => (
              <div
                className={styles.item}
                key={people.name + people.url}
                onClick={() => handleClick(people.name)}
              >
                <DescriptionField label="name">{people.name}</DescriptionField>
                <DescriptionField label="gender">{people.gender}</DescriptionField>
              </div>
            ))}
          </div>
          <div onClick={handleChangePage}>
            <button disabled={!previous} data-direction="prev">
              Prev
            </button>
            <button disabled={!next} data-direction="next">
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>Sorry, I didn't find anything</div>
      )}
    </section>
  );
}
