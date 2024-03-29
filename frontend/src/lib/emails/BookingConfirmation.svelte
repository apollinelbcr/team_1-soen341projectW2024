<script>
    import {Preview, Html, Head, Body, Container, Section, Heading, Text, Hr, Column, Button } from "svelte-email";
    export let name;
    export let vehicle;
    export let dates;
    export let location;
    export let totalPrice;
    export let confirmationNumber;
</script>

<Html lang="en">
<Head>
    <Preview preview="Booking Confirmation"/>
</Head>
<Body>
<Container>
    <Section>
        <Heading as="h1">Booking Confirmation</Heading>
        <Text>Hello, {name}!</Text>
        <Text>Your booking has been successfully confirmed. Here are your booking details:</Text>
    </Section>
    <Hr/>
    <Section>
        <Heading as="h2">Reservation Details</Heading>
            <Text><strong>Confirmation Number:</strong> {confirmationNumber}</Text>
            <Text><strong>Vehicle:</strong> {vehicle.name_vehicle} ({vehicle.vehicle_category} {vehicle.vehicle_type})</Text>
            <Text><strong>Dates:</strong> {dates}</Text>
            <Text><strong>Locations:</strong> {location}</Text>
            <Text><strong>Total Price:</strong> CA ${totalPrice.toFixed(2)}</Text>
    </Section>
    <Hr/>
    <Section>
        <strong>You may login to manage your booking</strong>
    </Section>
    <Hr/>
    <Section>
        <Text>If you have any questions, feel free to contact us at any time.</Text>
    </Section>
</Container>
</Body>
</Html>