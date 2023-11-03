import { Component } from 'react';
import ResponseApi from '../../types/api.ts';
import People from '../../types/people.ts';
import DescriptionField from '../description-field/DescriptionField.tsx';
import styles from './Results.module.css';
import Loading from '../loader/Loading.tsx';

type Props = {
  data: ResponseApi<People> | undefined;
  isLoading: boolean;
};

class Results extends Component<Props> {
  render() {
    const { data, isLoading } = this.props;

    return (
      <section className="results">
        <div className="results__list">
          {isLoading && <Loading />}
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
}

export default Results;
