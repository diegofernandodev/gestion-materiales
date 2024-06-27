
import { Routes, Route } from 'react-router-dom';
import EntregasPage from './pages/Entregaspage';
import MaterialesPage from './pages/materialPage';
import UsersPage from './pages/usersPage';
import RolesPage from './pages/RolesPage';
import LoginRegister from './components/login-Register/loginRegister';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/entregas" component={EntregasPage} />
          <Route path="/materiales" component={MaterialesPage} />
          <Route path="/usuarios" component={UsersPage} />
          <Route path="/roles" component={RolesPage} />
          {/* Ruta por defecto o página de inicio */}
          {/* <Route path="/" component={HomePage} exact /> */}
      </Routes>
    </div>
  );
}

export default App;