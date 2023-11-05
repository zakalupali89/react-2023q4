import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import DescriptionField from '../description-field/DescriptionField.tsx';
import styles from './Results.module.css';
import Loading from '../loader/Loading.tsx';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: ResponseApi<People> | undefined;
  isLoading: boolean;
};

export default function Results(props: Props) {
  const { data, isLoading } = props;
  const navigate = useNavigate();
  // const navigation = useNavigation();
  // const { name } = useParams();

  const handleClick = (id: string) => {
    const slugName = id.replace(' ', '-');
    navigate(`/detail/${slugName}`);
  };

  return (
    <section className={styles.results}>
      {isLoading && <Loading backgroundOpacity={0.2} />}
      {data?.results.length ? (
        data.results.map((people) => (
          <div
            className={styles.item}
            key={people.name + people.url}
            onClick={() => handleClick(people.name)}
          >
            <DescriptionField label="name">{people.name}</DescriptionField>
            <DescriptionField label="gender">{people.gender}</DescriptionField>
          </div>
        ))
      ) : (
        <div>Sorry, I didn't find anything</div>
      )}
    </section>
  );
}
