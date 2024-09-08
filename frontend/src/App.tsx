import { SignOutButton, useAuth } from '@clerk/clerk-react';
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import AdminDashboard from './pages/admin/AdminDashboard';
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';

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
              <>
                <Outlet />
              </>
            }
          >
            <Route
              path="/dashboard"
              element={
                <>
                  <h1>Dashboard</h1>
                  <SignOutButton />
                </>
              }
            />

            <Route path="/admin" element={<AdminDashboard />} />
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
