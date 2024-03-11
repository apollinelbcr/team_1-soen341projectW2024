import { UserStatus } from "./user-status.enum";
export declare class User {
    id: string;
    name_user: string;
    image: string;
    user_email: string;
    user_phone: string;
    user_password: string;
    status: UserStatus;
}
