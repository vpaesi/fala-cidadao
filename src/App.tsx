import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NovaDenuncia } from './pages/NovaDenuncia';
import { ListaDenuncias } from './pages/ListaDenuncias';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { DenunciasProvider } from './context/DenunciasContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("user");

  if (!isAuthenticated) {
    alert("Por favor, faça o login primeiro.");
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <DenunciasProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/cadastro" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/nova-denuncia" element={<PrivateRoute><NovaDenuncia /></PrivateRoute>} />
            <Route path="/denuncias" element={<ListaDenuncias />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DenunciasProvider>
  );
}

export default App;
