import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import { LoadingIndicator } from './components/LoadingIndicator';
import { useGetQuery } from './hooks';
import NotificationList from './pages/activities/list';
import BookingRequestsModal from './pages/admin/booking/BookingRequestsModal';
import AdminDashboard from './pages/admin/dashboard';
import MaintenanceIssuesPage from './pages/admin/maintanance/page';
import UserManagement from './pages/admin/user-management/user-management';
import BookingPage from './pages/bookings/page';
import HomePage from './pages/home/home';
import MobileSearch from './pages/home/mobile-search';
import IssueReportForm from './pages/issue-reporting';
import Issues from './pages/maintenance-staff/maintenance-reports-layout';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';

interface User {
  blocked: number;
  role: string;
}

const App: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { data: user } = useGetQuery<User>({
    resource: 'api/user/role',
  });

  if (!isLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {isSignedIn && user?.blocked === 0 && (
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
            {/* Theo */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<UserManagement />} />
            <Route path="/admin/manage-bookings" element={<BookingRequestsModal />} />
            <Route path="/admin/issues" element={<MaintenanceIssuesPage />} />
            {/* Daniel */}
            <Route path="/activity" element={<NotificationList />} />
            {/* Sisekelo */}
            <Route path="/venue/:id" element={<RoomDetails />} />
            <Route path="/venue/booking" element={<BookVenueForm />} />
            <Route path="/mobile/search" element={<MobileSearch />} />
            {/* Karabo */}
            <Route path="/maintenance/issues" element={<Issues />} />
            <Route path="/venue-issue-reporting" element={<IssueReportForm />} />
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
