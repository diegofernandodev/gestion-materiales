import { useState } from 'react';
import PropTypes from 'prop-types';

const MaterialComponent = ({ materiales, onCreate, onUpdate, onDelete }) => {
  const [newMaterial, setNewMaterial] = useState({ nombre: '', descripcion: '', stock: '' });
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [updatedMaterial, setUpdatedMaterial] = useState({ nombre: '', descripcion: '', stock: '' });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newMaterial);
    setNewMaterial({ nombre: '', descripcion: '', stock: '' });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate(editingMaterial.id, updatedMaterial);
    setEditingMaterial(null);
    setUpdatedMaterial({ nombre: '', descripcion: '', stock: '' });
  };

  return (
    <div>
      <h2 className="mt-4">Agregar Nuevo Material</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={newMaterial.nombre}
            onChange={(e) => handleInputChange(e, setNewMaterial)}
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
            value={newMaterial.descripcion}
            onChange={(e) => handleInputChange(e, setNewMaterial)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={newMaterial.stock}
            onChange={(e) => handleInputChange(e, setNewMaterial)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Agregar Material</button>
      </form>

      <h2 className="mt-5">Lista de Materiales</h2>
      <ul className="list-group">
        {materiales.map(material => (
          <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {material.nombre} - {material.descripcion} - {material.stock}
            </div>
            <div>
              <button 
                className="btn btn-warning btn-sm mr-2"
                onClick={() => {
                  setEditingMaterial(material);
                  setUpdatedMaterial({ nombre: material.nombre, descripcion: material.descripcion, stock: material.stock });
                }}
              >
                Editar
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(material.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingMaterial && (
        <div className="mt-5">
          <h2>Editar Material</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={updatedMaterial.nombre}
                onChange={(e) => handleInputChange(e, setUpdatedMaterial)}
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
                value={updatedMaterial.descripcion}
                onChange={(e) => handleInputChange(e, setUpdatedMaterial)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={updatedMaterial.stock}
                onChange={(e) => handleInputChange(e, setUpdatedMaterial)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Actualizar Material</button>
          </form>
        </div>
      )}
    </div>
  );
};

MaterialComponent.propTypes = {
  materiales: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  })).isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MaterialComponent;
