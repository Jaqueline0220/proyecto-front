import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from 'pages/Auth/LoginPage';
import Users from 'pages/Users/Index';
import Profile from 'pages/Profile/Index';
import ProfileEdit from 'pages/Profile/Edit';
import ProfileAddresses from 'pages/Profile/Addresses';
import CreateService from 'pages/Services/Create';
import AbiertoService from 'pages/Services/Abiertos';
import FinalizarService from 'pages/Services/Finalizar';
import Home from 'pages/Home/Index';
import { PageLayout } from 'layouts/PageLayout';

// private routes
const PrivateRoute = ({ component: RouteComponent }) => {
  const token = localStorage.getItem('token');
  if (token)
    return (
      <PageLayout>
        <RouteComponent />
      </PageLayout>
    );
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<PrivateRoute component={Home} />} />
      <Route path="/users" element={<PrivateRoute component={Users} />} />
      <Route path="/profile" element={<PrivateRoute component={Profile} />} />
      <Route
        path="/profile/edit"
        element={<PrivateRoute component={ProfileEdit} />}
      />
      <Route
        path="/servicio/abiertos"
        element={<PrivateRoute component={AbiertoService} />}
      />
      <Route
        path="/servicio/create"
        element={<PrivateRoute component={CreateService} />}
      />
      <Route
        path="/profile/addresses"
        element={<PrivateRoute component={ProfileAddresses} />}
      />
      <Route
        path="/servicio/finalizar/:id"
        element={<PrivateRoute component={FinalizarService} />}
      />
    </Routes>
  );
}

export default App;
