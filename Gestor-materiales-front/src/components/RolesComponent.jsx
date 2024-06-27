import { useState } from 'react';
import PropTypes from 'prop-types';

const RolesComponent = ({ roles, onCreate, onUpdate, onDelete }) => {
  const [newRole, setNewRole] = useState({ nombre: '', descripcion: '' });
  const [editingRole, setEditingRole] = useState(null);
  const [updatedRole, setUpdatedRole] = useState({ nombre: '', descripcion: '' });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newRole);
    setNewRole({ nombre: '', descripcion: '' });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingRole.id, updatedRole);
    setEditingRole(null);
    setUpdatedRole({ nombre: '', descripcion: '' });
  };

  return (
    <div>
      <h2 className="mt-4">Agregar Nuevo Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={newRole.nombre}
            onChange={(e) => handleInputChange(e, setNewRole)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={newRole.descripcion}
            onChange={(e) => handleInputChange(e, setNewRole)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar Rol</button>
      </form>

      <h2 className="mt-5">Lista de Roles</h2>
      <ul className="list-group">
        {roles.map(role => (
          <li key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {role.nombre} - {role.descripcion}
            </div>
            <div>
              <button 
                className="btn btn-warning btn-sm mr-2"
                onClick={() => {
                  setEditingRole(role);
                  setUpdatedRole({ nombre: role.nombre, descripcion: role.descripcion });
                }}
              >
                Editar
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(role.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingRole && (
        <div className="mt-5">
          <h2>Editar Rol</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={updatedRole.nombre}
                onChange={(e) => handleInputChange(e, setUpdatedRole)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={updatedRole.descripcion}
                onChange={(e) => handleInputChange(e, setUpdatedRole)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Actualizar Rol</button>
          </form>
        </div>
      )}
    </div>
  );
};

RolesComponent.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
  })).isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RolesComponent;
