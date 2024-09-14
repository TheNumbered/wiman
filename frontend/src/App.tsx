import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/bookings/page';
import Dashboard from './pages/dashboard';
import HomePage from './pages/home/home';
import Searchings from './pages/home/searching';
import MaintenanceDashboard from './pages/maintenance-staff/dashboard';
import Issues from './pages/maintenance-staff/maintenance-issues';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import { QuickBookVenueForm } from './pages/venue-booking/form/quick-book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';
import RoomsList from './pages/venue-booking/venue-listing';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';

const App: React.FC = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn && userId) {
    localStorage.setItem('onesignalUserId', userId);
    localStorage.setItem('onesignalUserRole', 'user'); // user | admin | mantainer
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {isSignedIn && (
          <Route
            element={
              // change this to route layout
              <>
                <Outlet />
              </>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/maintenance" element={<MaintenanceDashboard />} />
            <Route path="/test" element={<Issues />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/venues" element={<RoomsList />} />
            <Route path="/venue/:id" element={<RoomDetails />} />
            <Route path="/venue/booking" element={<BookVenueForm />} />
            <Route path="dd" element={<RoomDetails/>} />
          </Route>
        )}
        <Route
          path="/"
          element={isSignedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/sign-in'} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
