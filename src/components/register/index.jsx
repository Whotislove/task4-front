import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addUserInfo } from '../../redux/slices/user';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { data } = await axios
      .post('auth/register', values)
      .catch((res) => alert(res.response.data.message));
    dispatch(addUserInfo(data));
    if ('token' in data) {
      window.localStorage.setItem('token', data.token);
    }
    if (data) {
      navigate('/main');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Введите своё имя' })}
          className={styles.field}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
        />
        <TextField
          label="Password"
          variant="outlined"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
        />
        <Button disabled={!isValid} size="large" variant="contained" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};

export default Register;
