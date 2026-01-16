import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary text-white shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold">
          ExpenseTracker
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <Button onClick={handleLogout} variant="primary">Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;