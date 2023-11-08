import { Roles } from "src/modules/users/user-roles.enum";

const users = [
    {
        name: "Admin User",
        email: 'admin@example.com',
        password: 'admin@123',
        role: Roles.ADMIN
    },
    {
        name: "User",
        email: 'user@example.com',
        password: 'user@123',
    },
];

export default users;