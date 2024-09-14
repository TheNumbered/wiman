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
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/searchings" element={<Searchings />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-users" element={<UserBanManagement />} />
            <Route path="/admin/role-change" element={<RoleChangeRequests />} />
            <Route path="/admin/manage-bookings" element={<BookingRequestsModal />} />
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
