import {SetMetadata} from "@nestjs/common";

export const jwtConstants = {
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9hjkjkghKJRHShretf876',
};
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);