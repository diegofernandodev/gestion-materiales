import { useState } from 'react';
import PropTypes from 'prop-types';

const UsersComponent = ({ users, onCreate, onUpdate, onDelete }) => {
  const [newUser, setNewUser] = useState({ nombre: '', correo: '', password: '', rol_id: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ nombre: '', correo: '', password: '', rol_id: '' });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newUser);
    setNewUser({ nombre: '', correo: '', password: '', rol_id: '' });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingUser.id, updatedUser);
    setEditingUser(null);
    setUpdatedUser({ nombre: '', correo: '', password: '', rol_id: '' });
  };

  return (
    <div>
      <h2 className="mt-4">Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={newUser.nombre}
            onChange={(e) => handleInputChange(e, setNewUser)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            name="correo"
            value={newUser.correo}
            onChange={(e) => handleInputChange(e, setNewUser)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={newUser.password}
            onChange={(e) => handleInputChange(e, setNewUser)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rol_id">Rol ID</label>
          <input
            type="text"
            className="form-control"
            id="rol_id"
            name="rol_id"
            value={newUser.rol_id}
            onChange={(e) => handleInputChange(e, setNewUser)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar Usuario</button>
      </form>

      <h2 className="mt-5">Lista de Usuarios</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {user.nombre} - {user.correo} - {user.rol_id}
            </div>
            <div>
              <button 
                className="btn btn-warning btn-sm mr-2"
                onClick={() => {
                  setEditingUser(user);
                  setUpdatedUser({ nombre: user.nombre, correo: user.correo, password: '', rol_id: user.rol_id });
                }}
              >
                Editar
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(user.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="mt-5">
          <h2>Editar Usuario</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={updatedUser.nombre}
                onChange={(e) => handleInputChange(e, setUpdatedUser)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={updatedUser.correo}
                onChange={(e) => handleInputChange(e, setUpdatedUser)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={updatedUser.password}
                onChange={(e) => handleInputChange(e, setUpdatedUser)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rol_id">Rol ID</label>
              <input
                type="text"
                className="form-control"
                id="rol_id"
                name="rol_id"
                value={updatedUser.rol_id}
                onChange={(e) => handleInputChange(e, setUpdatedUser)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Actualizar Usuario</button>
          </form>
        </div>
      )}
    </div>
  );
};

UsersComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    correo: PropTypes.string.isRequired,
    rol_id: PropTypes.string.isRequired,
  })).isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UsersComponent;
