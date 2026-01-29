import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Imoveis from './pages/Imoveis';
import Placas from './pages/Placas';
import PrivateRoute from './components/auth/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import './styles/App.css';

function App() {
  return (
    <Routes>
      {/* Rota pública para Login */}
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas dentro do /dashboard */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Imoveis />} /> {/* Rota inicial do dashboard */}
          <Route path="placas" element={<Placas />} />
          {/* Adicione outras rotas do dashboard aqui */}
        </Route>
      </Route>
      
      {/* Você pode adicionar uma rota de fallback (404 Not Found) aqui se quiser */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;