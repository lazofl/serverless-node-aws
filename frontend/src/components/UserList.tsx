import { useState, useEffect } from 'react';
import { getUser, getAllUsers } from 'src/api/users';
import type { User } from 'src/types';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  const [userId, setUserId] = useState('');
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);

  useEffect(() => {
    const loadAllUsers = async () => {
      setLoadingAll(true);
      try {
        const fetchedUsers = await getAllUsers();
        setAllUsers(fetchedUsers);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoadingAll(false);
      }
    };

    loadAllUsers();
  }, []);

  const handleFetchUser = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError('');
    setFetchedUser(null);

    try {
      const user = await getUser(userId);
      setFetchedUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Get User by ID</h2>
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <button onClick={handleFetchUser} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Fetching...' : 'Get User'}
        </button>
      </div>
      {fetchedUser && (
        <div style={{ padding: '1rem', background: '#2a2a2a', borderRadius: '8px', marginBottom: '1rem' }}>
          <h3>Fetched User:</h3>
          <p><strong>ID:</strong> {fetchedUser.id}</p>
          <p><strong>Name:</strong> {fetchedUser.name}</p>
          <p><strong>Email:</strong> {fetchedUser.email}</p>
          {fetchedUser.createdAt && <p><strong>Created:</strong> {fetchedUser.createdAt}</p>}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Recently Added Users (Session)</h2>
      {users.length === 0 ? (
        <p>No users added this session.</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id} style={{ padding: '1rem', background: '#2a2a2a', borderRadius: '8px', marginBottom: '1rem' }}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.createdAt && <p><strong>Created:</strong> {user.createdAt}</p>}
            </div>
          ))}
        </div>
      )}

      <h2>All Users</h2>
      {loadingAll ? (
        <p>Loading all users...</p>
      ) : allUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div>
          {allUsers.map((user) => (
            <div key={user.id} style={{ padding: '1rem', background: '#2a2a2a', borderRadius: '8px', marginBottom: '1rem' }}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.createdAt && <p><strong>Created:</strong> {user.createdAt}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

