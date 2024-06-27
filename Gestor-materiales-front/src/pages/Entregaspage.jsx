import { useState, useEffect } from 'react';
import EntregasComponent from '../components/EntregasComponent';
import { obtenerEntregas, createEntrega, modificarEntrega, eliminarEntrega } from '../services/entregasService';

const EntregasPage = () => {
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerEntregas();
        setEntregas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (newEntrega) => {
    try {
      const createdEntrega = await createEntrega(newEntrega);
      setEntregas([...entregas, createdEntrega]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id, updatedEntrega) => {
    try {
      const modifiedEntrega = await modificarEntrega(id, updatedEntrega);
      setEntregas(entregas.map(entrega => (entrega.id === id ? modifiedEntrega : entrega)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarEntrega(id);
      setEntregas(entregas.filter(entrega => entrega.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Entregas</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <EntregasComponent 
        entregas={entregas}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EntregasPage;
