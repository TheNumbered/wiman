import { useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import NotificationList from './components/notifications/list';
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
            <Route path="/dashboard" element={<NotificationList />} />
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
