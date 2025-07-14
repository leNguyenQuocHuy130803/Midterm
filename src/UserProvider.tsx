import { createContext } from 'react';

export interface LoggedInUser {
    id: number;
    name: string;
    email: string;
    age?: number;
}

export const UserContext = createContext<{
    users: LoggedInUser[];
    addUser: (user: Omit<LoggedInUser, 'id'>) => void;
}>({
    users: [],
    addUser: () => { },
});
