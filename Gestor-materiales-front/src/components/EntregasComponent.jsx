import { useState } from 'react';
import PropTypes from 'prop-types';

const EntregasComponent = ({ entregas, onCreate, onUpdate, onDelete }) => {
  const [newEntrega, setNewEntrega] = useState({ usuario_id: '', material_id: '', fecha_entrega: '', cantidad: '' });
  const [editingEntrega, setEditingEntrega] = useState(null);
  const [updatedEntrega, setUpdatedEntrega] = useState({ usuario_id: '', material_id: '', fecha_entrega: '', cantidad: '' });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newEntrega);
    setNewEntrega({ usuario_id: '', material_id: '', fecha_entrega: '', cantidad: '' });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingEntrega.id, updatedEntrega);
    setEditingEntrega(null);
    setUpdatedEntrega({ usuario_id: '', material_id: '', fecha_entrega: '', cantidad: '' });
  };

  return (
    <div>
      <h2 className="mt-4">Agregar Nueva Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario_id">Usuario ID</label>
          <input
            type="text"
            className="form-control"
            id="usuario_id"
            name="usuario_id"
            value={newEntrega.usuario_id}
            onChange={(e) => handleInputChange(e, setNewEntrega)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="material_id">Material ID</label>
          <input
            type="text"
            className="form-control"
            id="material_id"
            name="material_id"
            value={newEntrega.material_id}
            onChange={(e) => handleInputChange(e, setNewEntrega)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_entrega">Fecha de Entrega</label>
          <input
            type="date"
            className="form-control"
            id="fecha_entrega"
            name="fecha_entrega"
            value={newEntrega.fecha_entrega}
            onChange={(e) => handleInputChange(e, setNewEntrega)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            name="cantidad"
            value={newEntrega.cantidad}
            onChange={(e) => handleInputChange(e, setNewEntrega)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar Entrega</button>
      </form>

      <h2 className="mt-5">Lista de Entregas</h2>
      <ul className="list-group">
        {entregas.map(entrega => (
          <li key={entrega.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {entrega.usuario_id} - {entrega.material_id} - {entrega.fecha_entrega} - {entrega.cantidad}
            </div>
            <div>
              <button 
                className="btn btn-warning btn-sm mr-2"
                onClick={() => {
                  setEditingEntrega(entrega);
                  setUpdatedEntrega({ usuario_id: entrega.usuario_id, material_id: entrega.material_id, fecha_entrega: entrega.fecha_entrega, cantidad: entrega.cantidad });
                }}
              >
                Editar
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(entrega.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingEntrega && (
        <div className="mt-5">
          <h2>Editar Entrega</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="usuario_id">Usuario ID</label>
              <input
                type="text"
                className="form-control"
                id="usuario_id"
                name="usuario_id"
                value={updatedEntrega.usuario_id}
                onChange={(e) => handleInputChange(e, setUpdatedEntrega)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="material_id">Material ID</label>
              <input
                type="text"
                className="form-control"
                id="material_id"
                name="material_id"
                value={updatedEntrega.material_id}
                onChange={(e) => handleInputChange(e, setUpdatedEntrega)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fecha_entrega">Fecha de Entrega</label>
              <input
                type="date"
                className="form-control"
                id="fecha_entrega"
                name="fecha_entrega"
                value={updatedEntrega.fecha_entrega}
                onChange={(e) => handleInputChange(e, setUpdatedEntrega)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                name="cantidad"
                value={updatedEntrega.cantidad}
                onChange={(e) => handleInputChange(e, setUpdatedEntrega)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Actualizar Entrega</button>
          </form>
        </div>
      )}
    </div>
  );
};

EntregasComponent.propTypes = {
  entregas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usuario_id: PropTypes.string.isRequired,
    material_id: PropTypes.string.isRequired,
    fecha_entrega: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  })).isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntregasComponent;
