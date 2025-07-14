// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import UserForm from './Components/UserForm';
import ListUser from './Pages/ListUser';
import UserDetail from './Pages/UserDetail';
import type { LoggedInUser } from './UserProvider';
import { UserContext } from './UserProvider';
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState<LoggedInUser[]>([]);

  const addUser = (user: Omit<LoggedInUser, 'id'>) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      <BrowserRouter>
        <div className="container mt-3">
          <nav className="mb-4">
            <NavLink to="/" className="me-3">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<><UserForm /><ListUser /></>} />
            <Route path="/users" element={<ListUser />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
