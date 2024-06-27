import { useEffect, useState } from 'react';
import MaterialComponent from '../components/MaterailComponent';
import { obtenerMateriales, createMaterial, modificarMaterial, eliminarMaterial } from '../services/materilaService';

const MaterialPage = () => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const fetchedMaterials = await obtenerMateriales();
      setMateriales(fetchedMaterials);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleCreateMaterial = async (materialData) => {
    try {
      await createMaterial(materialData);
      fetchMaterials();
    } catch (error) {
      console.error('Error creating material:', error);
    }
  };

  const handleUpdateMaterial = async (id, materialData) => {
    try {
      await modificarMaterial(id, materialData);
      fetchMaterials();
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await eliminarMaterial(id);
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  return (
    <div className="container mt-5">
      <MaterialComponent
        materiales={materiales}
        onCreate={handleCreateMaterial}
        onUpdate={handleUpdateMaterial}
        onDelete={handleDeleteMaterial}
      />
    </div>
  );
};

export default MaterialPage;
