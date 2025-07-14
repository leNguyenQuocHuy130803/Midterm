// src/Pages/UserDetail.tsx
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserProvider';

export default function UserDetail() {
    const { id } = useParams();
    const { users } = useContext(UserContext);

    const user = users.find((u) => u.id === Number(id));

    return (
        <div className="container mt-4">
            <h4>User Detail</h4>
            {user ? (
                <div className="border p-3 rounded">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age ?? 'N/A'}</p>
                </div>
            ) : (
                <p className="text-danger">User not found</p>
            )}
        </div>
    );
}
