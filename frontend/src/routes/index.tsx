import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import ExpensesPage from '../pages/ExpensesPage';
import BudgetsPage from '../pages/BudgetsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container p-4 mx-auto md:p-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;