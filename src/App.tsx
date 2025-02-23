import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NovaDenuncia } from './pages/NovaDenuncia';
import { DenunciasProvider } from './context/DenunciasContext';

function App() {
  return (
    <DenunciasProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-denuncia" element={<NovaDenuncia />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DenunciasProvider>
  );
}

export default App;