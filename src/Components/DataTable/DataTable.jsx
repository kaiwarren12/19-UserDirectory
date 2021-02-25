import React, { useEffect, useState } from "react";
import "./DataTable.css";
import axios from "axios";

export const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [placeholder, setPlaceholder] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(" ");

  const handleChange = (e) => {
    if (e.target.value === "reset") {
      const user_data = JSON.parse(localStorage.getItem("users"));
      if (user_data) {
        setUsers(user_data);
      }
    } else {
      if (currentFilter === " ") {
        localStorage.setItem("users", JSON.stringify(users));
        setCurrentFilter(e.target.value);
        const updatedUsers = users.filter(
          (user) => user.gender === e.target.value
        );
        setUsers(updatedUsers);
      } else {
        const users_obj = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users_obj.filter(
          (user) => user.gender === e.target.value
        );
        setUsers(updatedUsers);
      }
    }
  };

  const SortByAge = () => {
    const copy = [...users]
    copy.sort((user1, user2) => {
      return user1.dob.age - user2.dob.age;
    });
    setUsers(copy);
    
  };
const renderSorted = () => {
  console.log(users);
}
  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.results);
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

// useEffect(()=>{ 
// const sortedUsers = JSON.parse(localStorage.getItem("users"));
// setUsers(sortedUsers);
// }, [users])


  if (users === null) {
    return <h1>Fetching user informations...</h1>;
  } else {
    return (
      <div className="data-table">
        <div className="table-tools">
          <button onClick={SortByAge}>Sort By Age</button>
          <select onChange={handleChange}>
            <option disabled={true}>Filter By Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="reset">reset</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th className="theaders">First Name</th>
              <th className="theaders">Last Name</th>
              <th className="theaders">Gender</th>
              <th className="theaders">Age</th>
              <th className="theaders timage">Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td className="tdata">{user.name.first}</td>
                  <td className="tdata">{user.name.last}</td>
                  <td className="tdata">{user.gender}</td>
                  <td className="tdata">{user.dob.age}</td>
                  <td className="tdata timage">
                    <img src={user.picture.large} alt="User" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
