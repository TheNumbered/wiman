import { useAuth } from '@clerk/clerk-react';
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import BookingPage from './pages/bookings/page';
import HomePage from './pages/home/home';
import Searchings from './pages/home/searching';
import Dashboard from './pages/venue-details';

import Layout from './components/layout';
import { useGetQuery } from './hooks';
import BookingRequestsModal from './pages/admin/booking/BookingRequestsModal';
import AdminDashboard from './pages/admin/dashboard';
import RoleChangeRequests from './pages/admin/user-management/role-change';
import UserBanManagement from './pages/admin/user-management/user-ban';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
<<<<<<< HEAD
import { QuickBookVenueForm } from './pages/venue-booking/form/quick-book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';
import RoomsList from './pages/venue-booking/venue-listing';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';
=======
>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480

const App: React.FC = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { data: user } = useGetQuery<{ role: string }>({
    resource: 'api/user/role',
  });

  console.log(user?.role);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn && userId) {
    localStorage.setItem('onesignalUserId', userId);
    if (user?.role) {
      localStorage.setItem('onesignalUserRole', user.role); // user | admin | mantainer
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {isSignedIn && (
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
            <Route path="/maintenance" element={<MaintenanceDashboard />} />
            <Route path="/test" element={<Issues />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/venues" element={<RoomsList />} />
            <Route path="/venue/:id" element={<RoomDetails />} />
            <Route path="/venue/booking" element={<BookVenueForm />} />
            <Route path="dd" element={<RoomDetails/>} />
=======
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<UserBanManagement />} />
            <Route path="/admin/role-change" element={<RoleChangeRequests />} />
            <Route path="/admin/manage-bookings" element={<BookingRequestsModal />} />
>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480
          </Route>
        )}

        <Route
          path="/"
          element={isSignedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/sign-in'} />}
        />
<<<<<<< HEAD
=======

        <Route path="*" element={<>No Route Found</>} />
>>>>>>> 71525938d0135bf94f0922f8b4d147a80aa72480
      </Routes>
    </BrowserRouter>
  );
};

export default App;
