import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './Register.module.scss';
const Register = () => {
  return (
    <>
      <TextField className={styles.field} label="Name" variant="outlined" />
      <TextField className={styles.field} label="Email" variant="outlined" />
      <TextField className={styles.field} label="Password" variant="outlined" />
      <Button size="large" variant="contained">
        Зарегистрироваться
      </Button>
    </>
  );
};

export default Register;
