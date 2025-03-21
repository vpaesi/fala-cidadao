import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NovaDenuncia } from './pages/NovaDenuncia';
import { ListaDenuncias } from './pages/ListaDenuncias';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { DenunciasProvider } from './context/DenunciasContext';

function App() {
  return (
    <DenunciasProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-denuncia" element={<NovaDenuncia />} />
            <Route path="/denuncias" element={<ListaDenuncias />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DenunciasProvider>
  );
}

export default App;