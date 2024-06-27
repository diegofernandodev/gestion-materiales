// import { useEffect, useState } from 'react';
// import { obtenerEntregas } from '../services/api';
// import { getUserName, getUserRoleId } from '../helpers/getToken';

// const Dashboard = () => {
//   const [entregas, setEntregas] = useState([]);
//   const userName = getUserName();
//   const userRole = getUserRoleId();

//   useEffect(() => {
//     const fetchEntregas = async () => {
//       try {
//         const data = await obtenerEntregas();
//         setEntregas(data);
//       } catch (error) {
//         console.error('Error al obtener entregas:', error);
//       }
//     };

//     fetchEntregas();
//   }, []);

//   const renderEntregas = () => {
//     return entregas.map((entrega) => (
//       <tr key={entrega._id}>
//         <td>{entrega.usuario.nombre}</td>
//         <td>{entrega.material.nombre}</td>
//         <td>{entrega.material.descripcion}</td>
//         <td>{entrega.cantidad}</td>
//         <td>{new Date(entrega.fecha_entrega).toLocaleDateString()}</td>
//         <td>{entrega.estado}</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4 text-center">Bienvenido, {userName}</h1>
//       <div className="table-responsive">
//         <table className="table table-bordered table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Nombre del Usuario</th>
//               <th>Nombre del Material</th>
//               <th>Descripción del Material</th>
//               <th>Cantidad</th>
//               <th>Fecha de Entrega</th>
//               <th>Estado</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderEntregas()}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { obtenerEntregasRol } from '../services/entregasService';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [entregas, setEntregas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const data = await obtenerEntregasRol();
        setEntregas(data);
      } catch (error) {
        console.error('Error al obtener entregas:', error);
      }
    };

    fetchEntregas();
  }, []);

  if (!user) {
    history.push('/login');
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega.id}>
              <td>{entrega.id}</td>
              <td>{entrega.descripcion}</td>
              <td>{entrega.fecha}</td>
              <td>{entrega.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
