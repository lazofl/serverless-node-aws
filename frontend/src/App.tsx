import { useState } from 'react';
import { UserForm } from 'src/components/UserForm';
import { UserList } from 'src/components/UserList';
import type { User } from 'src/types';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleUserAdded = (user: User) => {
    setUsers([user, ...users]);
  };

  return (
    <div className="App">
      <h1>AWS Serverless User Management</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <UserForm onUserAdded={handleUserAdded} />
        <UserList users={users} />
      </div>
    </div>
  );
}

export default App;
