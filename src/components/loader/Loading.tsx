import styles from './Loading.module.css';

type Props = {
  backgroundOpacity?: number;
};

export default function Loading({ backgroundOpacity }: Props) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: backgroundOpacity ? `rgba(255,255,255, ${backgroundOpacity})` : '#242424',
      }}
    >
      Loading...
    </div>
  );
}
