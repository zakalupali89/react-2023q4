import { useEffect, useState } from 'react';

export default function ButtonError() {
  const [isError, setIsError] = useState(false);

  const handleBreak = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (isError) {
      throw new Error('Opsss, something went wrong');
    }
  });

  return <button onClick={handleBreak}>Break Me Completely</button>;
}
