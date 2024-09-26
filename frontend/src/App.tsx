import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import NotificationList from './components/notifications/list';
import BookingRequestsModal from './pages/admin/booking/BookingRequestsModal';
import AdminDashboard from './pages/admin/dashboard';
import RoleChangeRequests from './pages/admin/user-management/role-change';
import UserBanManagement from './pages/admin/user-management/user-ban';
import BookingPage from './pages/bookings/page';
import HomePage from './pages/home/home';
import MobileSearch from './pages/home/mobile-search';
import Searchings from './pages/home/searching';
import Issues from './pages/maintenance-staff/maintenance-reports-layout';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';
import VenueDetails from './pages/venue-details';

const App: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
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
            {/* Khare */}
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            {/* Theo */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<UserBanManagement />} />
            <Route path="/admin/role-change" element={<RoleChangeRequests />} />
            <Route path="/admin/manage-bookings" element={<BookingRequestsModal />} />
            {/* Daniel */}
            <Route path="/activity" element={<NotificationList />} />
            {/* Sisekelo */}
            <Route path="/venue/:id" element={<RoomDetails />} />
            <Route path="/venue/booking" element={<BookVenueForm />} />
            <Route path="/activity" element={<NotificationList />} />
            <Route path="/mobile/search" element={<MobileSearch />} />
            {/* Karabo */}
            <Route path="/maintenance/issues" element={<Issues />} />
            <Route path="/venue-details" element={<VenueDetails />} />
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
