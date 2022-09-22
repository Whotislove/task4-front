import React from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import styles from './Autorization.module.scss';
const Autorization = () => {
  const [choice, setChoice] = React.useState(0);
  const auth = ['Register', 'LogIn'];
  const onClickHeader = (i) => {
    setChoice(i);
  };
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <ul>
          {auth.map((e, i) => {
            return (
              <li
                key={i}
                onClick={() => onClickHeader(i)}
                className={choice === i ? styles.active : ''}>
                {e}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.root}>{choice === 0 ? <Register /> : <Login />}</div>
    </div>
  );
};

export default Autorization;
