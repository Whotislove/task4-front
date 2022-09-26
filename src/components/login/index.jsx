import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './Login.module.scss';
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addUserInfo } from '../../redux/slices/user';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const onSubmit = async (values) => {
    const { data } = await axios
      .post('auth/login', values)
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
          type="email"
          className={styles.field}
          label="Email"
          variant="outlined"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          variant="outlined"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained">
          Войти
        </Button>
      </form>
    </>
  );
};

export default Login;
