import {redirect} from "@sveltejs/kit";

export async function load({locals}) {
    if (!locals.user) {
        redirect(307, '/login');
    } else if (locals.user?.role === 'ADMIN' || locals.user?.role === 'CUSTOMER_SERVICE') {
        redirect(307, '/admin');
    }
}