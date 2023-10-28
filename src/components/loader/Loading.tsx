import { Component } from 'react';
import styles from './Loading.module.css';

export default class Loading extends Component {
  render() {
    return <div className={styles.container}>Loading...</div>;
  }
}
