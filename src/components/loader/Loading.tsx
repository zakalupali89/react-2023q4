import styles from './Loading.module.css';

type Props = {
  backgroundOpacity: number;
};

export default function Loading({ backgroundOpacity }: Props) {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: `rgba(255,255,255, ${backgroundOpacity})` }}
    >
      Loading...
    </div>
  );
}
