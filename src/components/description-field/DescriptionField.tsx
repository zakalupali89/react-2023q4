import { Component } from 'react';
import styles from './DescriptionField.module.css';

type Props = {
  label: string;
  children: string;
};

export default class DescriptionField extends Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.label}>{this.props.label + ':'}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
