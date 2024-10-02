import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ErrorComponent from './components/error-component';
import Layout from './components/layout';
import { LoadingIndicator } from './components/LoadingIndicator';
import { useGetQuery } from './hooks';
import NotificationList from './pages/activities/list';
import BookingRequestsModal from './pages/admin/booking/BookingRequestsModal';
import AdminDashboard from './pages/admin/dashboard';
import MaintenanceIssuesPage from './pages/admin/maintanance/page';
import UserManagement from './pages/admin/user-management/user-management';
import BannedPage from './pages/banned';
import BookingPage from './pages/bookings/page';
import HomePage from './pages/home/home';
import MobileSearch from './pages/home/mobile-search';
import IssueReportForm from './pages/issue-reporting';
import Issues from './pages/maintenance-staff/maintenance-reports-layout';
import MobileProfilePage from './pages/mobile-profile/profile';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import { BookVenueForm } from './pages/venue-booking/form/book-venue-form';
import RoomDetails from './pages/venue-booking/venue-details/venue-details';

interface User {
  blocked: number;
  role: string;
}

const App: React.FC = () => {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const {
    data: user,
    isLoading,
    isError,
  } = useGetQuery<User>({
    resource: 'api/user/role',
  });

  if (!isLoaded) {
    return <LoadingIndicator />;
  }

  if (userId) {
    localStorage.setItem('onesignalUserId', userId);
    if (user?.role) {
      localStorage.setItem('onesignalUserRole', user.role);
    }
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
            {user?.role === 'admin' && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage-users" element={<UserManagement />} />
                <Route path="/admin/manage-bookings" element={<BookingRequestsModal />} />
                <Route path="/admin/issues" element={<MaintenanceIssuesPage />} />
              </>
            )}

            {user?.role === 'maintenance' && (
              <>
                <Route path="/maintenance" element={<Issues />} />
              </>
            )}

            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/activity" element={<NotificationList />} />
            <Route path="/venue/:id" element={<RoomDetails />} />
            <Route path="/venue/booking" element={<BookVenueForm />} />
            <Route path="/mobile/search" element={<MobileSearch />} />
            <Route path="/venue-issue-reporting/:venueId" element={<IssueReportForm />} />
            <Route path="/profile" element={<MobileProfilePage />} />
          </Route>
        )}
        {isLoading && <Route path="*" element={<LoadingIndicator />} />}
        {isError && (
          <Route
            path="*"
            element={
              <ErrorComponent
                errorTitle="Server Error"
                errorMessage="A network error occurred"
                onRetry={() => window.location.reload()}
              />
            }
          />
        )}
        {isSignedIn && user?.blocked === 1 && <Route path="*" element={<BannedPage />} />}
        <Route
          path="/"
          element={isSignedIn ? <Navigate to={'/dashboard'} /> : <Navigate to={'/sign-in'} />}
        />

        <Route
          path="*"
          element={
            <ErrorComponent
              errorMessage="Page not found"
              onRetry={() => window.location.reload()}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
