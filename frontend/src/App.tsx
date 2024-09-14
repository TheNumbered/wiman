import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/bookings/page';
import Dashboard from './pages/dashboard';
import HomePage from './pages/home/home';
import Searchings from './pages/home/searching';
import MaintenanceDashboard from './pages/maintenance-staff/dashboard';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';

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
            <Route path="/book" element={<BookVenueForm />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
        )}
        <Route
          path="/"
          element={isSignedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/sign-in'} />}
        />
        <Route path="*" element={<>No Route Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
