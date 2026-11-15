import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import DestinationsPage from './pages/DestinationsPage.jsx';
import DestinationDetailPage from './pages/DestinationDetailPage.jsx';
import StaysPage from './pages/StaysPage.jsx';
import BudgetCalculatorPage from './pages/BudgetCalculatorPage.jsx';
import RoutePlannerPage from './pages/RoutePlannerPage.jsx';
import TripPlannerPage from './pages/TripPlannerPage.jsx';
import HeritageGPTPage from './pages/HeritageGPTPage.jsx';
import MyTripPage from './pages/MyTripPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import AdminRoute from './components/layout/AdminRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="destinations/:slug" element={<DestinationDetailPage />} />
        <Route path="stays" element={<StaysPage />} />
        <Route path="hotels" element={<StaysPage />} />
        <Route path="budget" element={<BudgetCalculatorPage />} />
        <Route path="route-planner" element={<RoutePlannerPage />} />
        <Route path="routes" element={<RoutePlannerPage />} />
        <Route path="ai-planner" element={<TripPlannerPage />} />
        <Route path="heritage" element={<HeritageGPTPage />} />
        <Route path="heritage-gpt" element={<HeritageGPTPage />} />
        <Route path="my-trip" element={<MyTripPage />} />
        <Route path="moments" element={<MyTripPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
