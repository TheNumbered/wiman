import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ComponentShowcase from './pages/component-show';

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<center>{message ?? 'Loading...'}</center>} />
        <Route path="/components" element={<ComponentShowcase />} />
        <Route path="*" element={<>No Route Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
