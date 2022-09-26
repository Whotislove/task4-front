import React from 'react';
import { Link } from 'react-router-dom';
import style from './MainPage.module.scss';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logOut } from '../../redux/slices/user';
const checkArr = [];
// for (let i = 0; i < arr.length; i++) {
//   checkArr.push(false);
// }
const MainPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = React.useState();
  React.useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get('/users');
        setData(data);
      } catch (error) {
        alert('Не удалось получить пользователей');
      }
    }
    getData();
  }, []);
  const [checked, setChecked] = React.useState(checkArr);
  const [checkedAll, setCheckedAll] = React.useState(false);
  const onChangeSelect = () => {
    let copy = Object.assign([], checked);
    for (let i = 0; i < checked.length; i++) {
      copy[i] = !checkedAll;
    }
    setChecked(copy);
    setCheckedAll(!checkedAll);
    console.log(checked);
  };
  if (!data) {
    return <>Загрузка...</>;
  }

  const onClickLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
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
          <button>Block</button>
          <button>Unblock</button>
          <button>Delete</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th className={style.checkbox}>
                Select all
                <input
                  type="checkbox"
                  checked={
                    checkedAll ||
                    checked.every((e) => {
                      return e === true;
                    })
                  }
                  onChange={() => onChangeSelect()}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
            {data.map((val, id) => {
              return (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checked[id]}
                      onChange={() => {
                        let copy = Object.assign([], checked);
                        copy[id] = !checked[id];
                        setChecked(copy);
                        console.log(data[id]._id);
                      }}
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
