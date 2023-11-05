import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import DescriptionField from '../description-field/DescriptionField.tsx';
import styles from './Results.module.css';
import Loading from '../loader/Loading.tsx';

type Props = {
  data: ResponseApi<People> | undefined;
  isLoading: boolean;
};

export default function Results(props: Props) {
  const { data, isLoading } = props;
  return (
    <section className={styles.container}>
      {isLoading && <Loading backgroundOpacity={0.2} />}
      <div className={styles.results}>
        {data?.results.length ? (
          data.results.map((people) => (
            <div className={styles.item} key={people.name + people.url}>
              <DescriptionField label="name">{people.name}</DescriptionField>
              <DescriptionField label="gender">{people.gender}</DescriptionField>
              <DescriptionField label="eye color">{people.eye_color}</DescriptionField>
              <DescriptionField label="hair color">{people.hair_color}</DescriptionField>
            </div>
          ))
        ) : (
          <div>Sorry, I didn't find anything</div>
        )}
      </div>
    </section>
  );
}
