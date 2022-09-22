import React from 'react';
import { Link } from 'react-router-dom';
import style from './MainPage.module.scss';
const MainPage = () => {
  const [checked, setChecked] = React.useState([false, false, false]);
  const arr = [
    {
      mail: 'test1@mail.com',
      name: 'andrey',
      status: 'active',
    },
    {
      mail: 'test2@mail.com',
      name: 'Vasya',
      status: 'active',
    },
    {
      mail: 'test3@mail.com',
      name: 'Vitek',
      status: 'Block',
    },
  ];
  return (
    <>
      <div className={style.about}>
        <span>Vlados</span>
        <Link to="/">
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
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
            {arr.map((val, id) => {
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
                      }}
                    />
                  </td>
                  <td>{val.name}</td>
                  <td>{val.mail}</td>
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
