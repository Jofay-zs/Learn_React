import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { editUserApi } from "utils/api";
import { getUsersApi } from "utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsersApi(
        (response) => {
          // console.log(response.data);
          setUsers(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    fetchUsers();
  }, []);
  return (
    <div className='w-screen h-full flex justify-center items-center'>
      <table className="cars-table w-3/5 h-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <UsersRoles user={user} />
                </td>
                <td>
                  <UsersStatus user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const UsersRoles = ({ user }) => {
  const [rol, setRol] = useState(user.rol);

  useEffect(() => {
    const editUser = async () => {
      await editUserApi(
        user._id,
        { rol },
        (response) => {
          // console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    if (user.rol !== rol) {
      editUser();
    }
  }, [rol, user]);

  return (
    <select
      name="rol"
      value={rol}
      onChange={(e) => {
        setRol(e.target.value);
      }}
    >
      <option value="" disabled >Select a rol</option>
      <option value="admin">Admin</option>
      <option value="vendor">Vendor</option>
      <option value="no rol">No rol</option>
    </select>
  );
};

const UsersStatus = ({ user }) => {
  const [status, setStatus] = useState(user.status ?? '');

  useEffect(() => {
    const editUser = async () => {
      await editUserApi(
        user._id,
        { status },
        (response) => {
          // console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    if (user.status !== status) {
      editUser();
    }
  }, [status, user]);

  return (
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="" disabled >Select an status</option>
      <option value="authorized" className='text-green-500' >Authorized</option>
      <option value="pending" className='text-yellow-500' >Pendindg</option>
      <option value="rejected" className='text-red-500' >Rejected</option>
    </select>
  );
};

export default Users;
