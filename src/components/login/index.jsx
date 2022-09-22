import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './Login.module.scss';
const Login = () => {
  return (
    <>
      <TextField className={styles.field} label="Email" variant="outlined" />
      <TextField className={styles.field} label="Password" variant="outlined" />
      <Button size="large" variant="contained">
        Войти
      </Button>
    </>
  );
};

export default Login;
