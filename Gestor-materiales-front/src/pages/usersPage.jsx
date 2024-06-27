import { useEffect, useState } from 'react';
import UsersComponent from '../components/usersComponent';
import { obtenerUsers, createUser, modificarUser, eliminarUser } from '../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await obtenerUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await modificarUser(id, userData);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await eliminarUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <UsersComponent
        users={users}
        onCreate={handleCreateUser}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
