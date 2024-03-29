import { json } from '@sveltejs/kit';
import { render } from 'svelte-email';
import BookingConfirmation from '$lib/emails/BookingConfirmation.svelte';
import sendgrid from '@sendgrid/mail';
import { SENDGRID_API } from '$env/static/private'

sendgrid.setApiKey(SENDGRID_API);

export async function POST({ request }) {
    const bookingDetails = await request.json();

    const emailHtml = render({
        template: BookingConfirmation,
        props: bookingDetails,
    });

    const options = {
        from: 'Beaudelaire.dev@gmail.com',
        to: bookingDetails.email,
        subject: 'Booking Confirmation',
        html: emailHtml,
    };

    try {
        await sendgrid.send(options);
        return json({ success: true });
    } catch (err) {
        console.error('Error sending email:', err);
        // Respond with a server error
        return new Response('Error sending email', { status: 500 });
    }
}
