import { createContext } from 'react';

export interface LoggedInUser {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// :ko dùng omit
export interface NewUser {
    name: string;
    email: string;
    age?: number;
}

export const UserContext = createContext<{
    users: LoggedInUser[];

    // cách 1 : dùng bthg :
    addUser: (user: NewUser) => void;


    // cách 2 : dùng với Omit
    // addUser: (user: Omit<LoggedInUser, 'id'>) => void;  // omit là thuộc tính của utility type  Omit<Type, Keys> :
    // tạo kiểu mới từ kiểu cũ, bỏ đi một hoặc nhiều trường.
    // dòng trên nghĩa là : Lấy toàn bộ các trường của LoggedInUser, nhưng loại bỏ (omit) trường id.
    // ban đầu ta có :
    //     {
    //     id: number;
    //     name: string;
    //     email: string;
    //     age ?: number;
    // }
    // sau khi omit nó sẽ mất đi truòng id 

    //     Chức năng addUser thường dùng để:

    //         Thêm một user mới từ form nhập(gồm name, email, age)

    // Nhưng id sẽ được tự tạo trong code(thường là auto increment, random hoặc UUID)

    // 👉 Vì vậy, bạn không cần truyền id khi gọi addUser.



}>({
    users: [],
    addUser: () => { },
});
