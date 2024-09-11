import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';
import { QuickBookVenueForm } from './pages/venue-booking/form/quick-book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';
import RoomsList from './pages/venue-booking/venue-listing';


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
        {/* <Route path="/components" element={<ComponentShowcase />} /> */}
        <Route path="*" element={<>No Route Found</>} />
        <Route path="/rooms" element={<RoomsList/>} />
        <Route path="/room/:id" element={<RoomDetails/>} />
        <Route path="/room/:id/book" element={<QuickBookVenueForm/>} />
        <Route path="/room/booking" element={<BookVenueForm/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
