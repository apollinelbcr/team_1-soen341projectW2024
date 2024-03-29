<script>
    import {Preview, Html, Head, Body, Container, Section, Heading, Text, Hr } from "svelte-email";

    export let name;
    export let vehicle;
    export let pickupDate;
    export let dropOffDate;
    export let pickupLoc;
    export let dropOffLoc;
    export let pickupTime;
    export let dropOffTime;
    export let extrasJoined;
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
        <Text>Your booking has been successfully confirmed. Below are the details of your reservation:</Text>
    </Section>
    <Hr/>
    <Section>
        <Heading as="h2">Reservation Details</Heading>
        <Text><strong>Confirmation Number:</strong> {confirmationNumber}</Text>
        <Text><strong>Vehicle:</strong> {vehicle.name_vehicle} ({vehicle.vehicle_category} {vehicle.vehicle_type})</Text>
        <Text><strong>Pickup Date:</strong> {pickupDate} at {pickupTime}</Text>
        <Text><strong>Pickup Location:</strong> {pickupLoc}</Text>
        <Text><strong>Drop-off Date:</strong> {dropOffDate} at {dropOffTime}</Text>
        <Text><strong>Drop-off Location:</strong> {dropOffLoc}</Text>
        <Text><strong>Extras:</strong> {extrasJoined}</Text>
        <Text><strong>Total Price:</strong> CA ${totalPrice.toFixed(2)}</Text>
    </Section>
    <Hr/>
    <Section>
        <Text>You can manage your booking using the information provided above. Should you need to make any changes or have any questions, feel free to contact us.</Text>
    </Section>
</Container>
</Body>
</Html>
