import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './MainPage.module.scss';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logOut } from '../../redux/slices/user';
import { addUsers } from '../../redux/slices/usersTable';
const MainPage = () => {
  const ref = React.useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.userTable);
  const dispatch = useDispatch();

  const [checkedState, setCheckedState] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get('/users').catch((res) => {
          alert(res.response.data.message);
          navigate('/');
        });
        dispatch(addUsers(data));
        setCheckedState(new Array(data.length).fill(false));
      } catch (error) {
        console.log('Не удалось получить пользователей');
      }
    }
    getData();
  }, []);
  if (users.length === 0 && checkedState.length === 0) {
    return <>Загрузка...</>;
  }
  const handleOnChange = (id) => {
    const updateCheckedState = checkedState.map((item, index) => {
      return index === id ? !item : item;
    });
    setCheckedState(updateCheckedState);
  };

  const onClickLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
  };
  const onClickSelectAll = () => {
    const updateCheckedState = checkedState.map((item) => {
      return (item = ref.current.checked);
    });
    setCheckedState(updateCheckedState);
  };
  const block = () => {
    checkedState.map((e, i) => {
      if (e === true) {
        axios.patch(`${process.env.REACT_APP_API_URL}/users/${users[i]._id}`, { status: 'block' });
        setTimeout(() => {
          dispatch(logOut());
          window.localStorage.removeItem('token');
          navigate('/');
        });
      }
    });
  };
  const unblock = () => {
    checkedState.map((e, i) => {
      if (e === true) {
        axios.patch(`${process.env.REACT_APP_API_URL}/users/${users[i]._id}`, { status: 'active' });
        setTimeout(() => {
          dispatch(logOut());
          window.localStorage.removeItem('token');
          navigate('/');
        });
      }
    });
  };
  const deleteUser = () => {
    checkedState.map((e, i) => {
      if (e === true) {
        axios.delete(`${process.env.REACT_APP_API_URL}/users/${users[i]._id}`);
        setTimeout(() => {
          dispatch(logOut());
          window.localStorage.removeItem('token');
          navigate('/');
        });
      }
    });
  };
  return (
    <>
      <div className={style.about}>
        <span>{user.fullName}</span>
        <Link to="/" onClick={() => onClickLogOut()}>
          <button>logOut</button>
        </Link>
      </div>
      <div className={style.content}>
        <div className={style.toolbar}>
          <button onClick={() => block()}>Block</button>
          <button onClick={() => unblock()}>Unblock</button>
          <button onClick={() => deleteUser()}>Delete</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th className={style.checkbox}>
                Select all
                <input
                  ref={ref}
                  type="checkbox"
                  checked={checkedState.every((e) => e === true)}
                  onChange={() => onClickSelectAll()}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
            {users.map((val, id) => {
              return (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedState[id]}
                      onChange={() => handleOnChange(id)}
                    />
                  </td>
                  <td>{val.fullName}</td>
                  <td>{val.email}</td>
                  <td>{val.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainPage;
