import { UserRole } from "../users-roles.enum";
import { UserStatus } from "../users-status.enum";
export declare class UpdateUserAdminDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRole;
    phone_number: string;
    driver_license: string;
    status: UserStatus;
}
