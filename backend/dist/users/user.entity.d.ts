import { UserCategories } from "./user-categories.enum";
import { UserStatus } from "./user-status.enum";
import { UserTransmissions } from "./user-transmissions.enum";
import { UserTypes } from "./user-types.enum";
export declare class User {
    id: string;
    name_user: string;
    image: string;
    user_type: UserTypes;
    user_category: UserCategories;
    user_transmission: UserTransmissions;
    status: UserStatus;
}
