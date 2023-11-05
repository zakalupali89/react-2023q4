import styles from './DescriptionField.module.css';

type Props = {
  label: string;
  children: string;
};

export default function DescriptionField(props: Props) {
  const { label, children } = props;
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label + ':'}</div>
      <div>{children}</div>
    </div>
  );
}
