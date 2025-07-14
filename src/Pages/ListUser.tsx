// src/Pages/ListUser.tsx
import { useContext } from 'react';
import { UserContext } from '../UserProvider';
import { Link } from 'react-router-dom';

export default function ListUser() {
    const { users } = useContext(UserContext);

    return (
        <div>
            <h5>User List</h5>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {users.length === 0 ? (
                        <tr><td colSpan={4} className="text-center">No users found</td></tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age ?? 'N/A'}</td>
                                <td>
                                    <Link to={`/users/${user.id}`} className="btn btn-sm btn-info">View</Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
