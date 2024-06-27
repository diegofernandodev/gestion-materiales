import { useEffect, useState } from 'react';
import RolesComponent from '../components/RolesComponent';
import { obtenerRoles, createRole, modificarRole, eliminarRole } from '../services/roleService';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const fetchedRoles = await obtenerRoles();
      setRoles(fetchedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateRole = async (roleData) => {
    try {
      await createRole(roleData);
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleUpdateRole = async (id, roleData) => {
    try {
      await modificarRole(id, roleData);
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await eliminarRole(id);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="container mt-5">
      <RolesComponent
        roles={roles}
        onCreate={handleCreateRole}
        onUpdate={handleUpdateRole}
        onDelete={handleDeleteRole}
      />
    </div>
  );
};

export default RolesPage;
