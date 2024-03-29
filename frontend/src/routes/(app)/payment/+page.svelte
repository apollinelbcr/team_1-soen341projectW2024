<script lang="ts">
    import {ChevronDown, ChevronRight, CreditCard, Lock} from "lucide-svelte";
    import {writable} from "svelte/store";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {repo} from "$lib/repo.js";
    import {type Vehicle} from "$lib/model/vehicle";
    import {calculateDaysBetween, generateUUID, showAlert} from "$lib/utils";
    import {toast} from "svelte-sonner";

    const user = $page.data.user;
    const dates = writable('');
    const locations = writable('');
    let id;
    let vehicle: Vehicle;
    $: basePrice = vehicle?.price;
    let extras;

    $: if ($page.url.searchParams) {
        dates.set($page.url.searchParams.get('d'));
        locations.set($page.url.searchParams.get('l'));
        id = $page.url.searchParams.get('id');
        const extrasString = $page.url.searchParams.get('extras');
        if (extrasString) {
            extras = JSON.parse(extrasString);
        }
    }

    $: taxes = 0.15 * (extras?.map(extra => extra.price).reduce((acc, extra) => acc + extra, 0) + (calculateDaysBetween($dates) * Number(basePrice)));
    $: total = (calculateDaysBetween($dates) * Number(basePrice)) + extras?.map(extra => extra.price).reduce((acc, extra) => acc + extra, 0) + Number(taxes);

    onMount(async () => {
        vehicle = await repo.getVehicle(id);
    });

    let email = '';
    let cardName = '';
    let cardNumber = '';
    let expDate = '';
    let expYear = '';
    let securityCode = '';
    let postalCode = '';

    $: console.log(email, cardName, cardNumber, expDate, expYear, securityCode, postalCode);
    function validateInputs() {
        return email.trim() !== '' &&
            cardName.trim() !== '' &&
            String(cardNumber).trim() !== '' &&
            expDate.trim() !== '' &&
            expYear.trim() !== '' &&
            securityCode.trim() !== '' &&
            postalCode.trim() !== '';
    }

    async function completeBooking() {
        let result = validateInputs();

        if (result) {
            const [datePart, timePart] = $dates.split('to').map(part => part.trim());
            const [pickupDate, pickupTime] = datePart.split(',').map(part => part.trim());
            const [dropOffDate, dropOffTime] = timePart.split(',').map(part => part.trim());
            const [pickupLoc, dropOffLoc] = $locations.split('->').map(part => part.trim());
            const extrasJoined = extras && extras.length > 0 ? extras.map(extra => extra.name).join(', ') : 'None';

            const bookingDetails = {
                email,
                name: user.username,
                vehicle: vehicle ? {
                    name_vehicle: vehicle.name_vehicle,
                    vehicle_category: vehicle.vehicle_category,
                    vehicle_type: vehicle.vehicle_type,
                } : {},
                pickupDate: pickupDate,
                dropOffDate: dropOffDate,
                pickupLoc: pickupLoc,
                dropOffLoc: dropOffLoc,
                pickupTime: pickupTime,
                dropOffTime: dropOffTime,
                extrasJoined: extrasJoined,
                totalPrice: total,
                confirmationNumber: generateUUID(),
            };

            const userDetails = await repo.getUserById(user.sub);

            const reservationReview = {
                email: email,
                vehicle_name: vehicle.name_vehicle,
                pickup_date: pickupDate,
                dropoff_date: dropOffDate,
                pickup_location: pickupLoc,
                dropoff_location: dropOffLoc,
                pickup_time: pickupTime,
                dropoff_time: dropOffTime,
                price: parseInt(total, 10), // Ensure price is an integer
                extras: extrasJoined,
                isMadeBy: 'customer',
                isPaid: 'true',
                isCheckedOut: 'false',
                userName: userDetails.first_name,
                userName2: userDetails.last_name,
                userPhone: userDetails.phone_number,
                userLicense: userDetails.driver_license,
                vehicleName: vehicle.name_vehicle,
                vehicleType: vehicle.vehicle_type,
                vehicleCategory: vehicle.vehicle_category,
                vehicleTransmission: vehicle.vehicle_transmission,
            };

            try {
                // Send booking details to your server endpoint
                const response = await fetch('/emails/sendBookingConfirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingDetails),
                });

                const res = await fetch('http://localhost:3002/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(reservationReview).toString()
                });

                console.log("res", res);
                console.log("data", reservationReview)

                if (!response.ok) {
                    showAlert('Error', 'Failed to send booking confirmation email.', 'danger', 'Retry');
                }

                if (!res.ok) {
                    showAlert('Error', 'Failed to process reservation.', 'danger', 'Retry');
                }

                showAlert('Booking completed successfully', 'Check your email for confirmation.', 'success', 'Done');
            } catch (error) {
                console.error(error);
                showAlert('Error', 'There was a problem with your booking confirmation.', 'danger', 'Retry');
            }
        } else {
            showAlert('Oops!', 'Please add your confirmation email and payment details', 'danger', 'Continue');
        }
    }
</script>

<div id="whole-page" class="max-w-4xl mx-auto">
    <h1 class="text-blue-900 text-xl font-bold mt-8">
        Secure booking — only takes 2 minutes!
    </h1>

    <div class="flex mt-4 shadow p-4">
        <!-- Icon here: For demo, replace with Tailwind CSS icon or custom SVG -->
        <div class="text-3xl">📅</div>
        <div class="ml-4">
            <p class="font-bold">Free cancellation before {$dates?.split('to')[0]} (property local time)</p>
            <p>You can change or cancel this stay for a full refund if plans change. Because flexibility matters.</p>
        </div>
    </div>

    <div class="flex max-lg:flex-wrap gap-5 justify-between mt-4">
        <div class="lg:w-3/5">
            <div class="box4">
                <div>
                    <CreditCard class="h-8 w-10"/>
                </div>
                <div>
                    <p class="text-green-900 flex my-3 items-center">
                        <ChevronRight/>
                        We use secure transmission
                        <ChevronRight/>{" "}
                        We protect your personal information
                    </p>
                    <p>Debit/Credit Card</p>
                    <hr class="border-t-2"/>
                    <div
                            class="carddetail flex my-4 h-2"
                    >
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_master_card.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_american_express.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_china_union_pay.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_diners_club.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_discover.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_jcb.svg"
                                alt=""
                        />
                        <img
                                src="https://a.travel-assets.com/dms-svg/payments/cards-cc_visa.svg"
                                alt=""
                        />
                    </div>
                    <div class="inputdiv">
                        <p class="name">Name on Card</p>
                        <input type="text" class="input w-2/3" bind:value={cardName}/>
                    </div>
                    <div class="inputdiv">
                        <p class="name">Debit/Credit card number</p>
                        <input bind:value={cardNumber}
                                type="number"
                                class="input w-1/2"
                        />
                    </div>
                    <div class="inputdiv">
                        <p class="name">Expiration date</p>
                        <div class="flex">
                            <select bind:value={expDate}
                                    class="country w-[25%] mr-1"
                            >
                                <option value="usa">
                                    Month
                                    <ChevronDown/>
                                </option>
                                <option value="india">
                                    January
                                    <ChevronDown/>
                                </option>
                                <option value="china">
                                    February
                                    <ChevronDown/>
                                </option>
                                <option value="uk">
                                    March
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    April
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    May
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    June
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    July
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    August
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    September
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    October
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    November
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    December
                                    <ChevronDown/>
                                </option>
                            </select>
                            <select class="country w-1/4" bind:value={expYear}>
                                <option value="usa">
                                    Year
                                    <ChevronDown/>
                                </option>
                                <option value="india">
                                    2024
                                    <ChevronDown/>
                                </option>
                                <option value="china">
                                    2025
                                    <ChevronDown/>
                                </option>
                                <option value="uk">
                                    2026
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2027
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2028
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2029
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2030
                                    <ChevronDown/>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="inputdiv mr-2">
                            <p class="name">Security code</p>
                            <input bind:value={securityCode}
                                    type="password"
                                    class="input w-1/3"
                            />
                        </div>
                        <div class="inputdiv">
                            <p class="name">Billing ZIP code</p>
                            <input bind:value={postalCode}
                                    type="text"
                                    class="input w-1/2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="box5">
                <h2 class="font-bold mb-2"
                >
                    Manage your booking
                </h2>
                <hr class="border-t mb-2"
                />
                <p>
                    <b>Confirmation email</b>
                </p>
                <p>
                    Please enter the email address where you would like to receive
                    your confirmation.
                </p>
                <div class="inputdiv">
                    <p class="name">Email adress</p>
                    <input
                            bind:value={email}
                            type="email"
                            placeholder="(e.g. xyz@gmail.com)"
                            class="input w-1/2"
                    />
                </div>
            </div>

            <div class="box6">
                <p
                        style={{
                                fontSize: "17px",
                                color: "black",
                                marginTop: "10px",
                                marginBottom: "10px",
                            }}
                >
                    <b>Important information about your booking</b>
                </p>
                <div class="overflow">
                    <li>
                        Cancellations or changes made after 11:59pm (property local
                        time) on Sep 1, 2022 or no-shows are subject to a property fee
                        equal to 100% of the total amount paid for the reservation.
                    </li>
                    <li>
                        The host will greet guests on arrival. For more details, please
                        contact the property using the information on the booking
                        confirmation.
                    </li>
                    <li>
                        To register at this property, guests who are Indian citizens
                        must provide a valid photo identity card issued by the
                        Government of India; travelers who are not citizens of India
                        must present a valid passport and visa.
                    </li>
                    <li>
                        You'll be asked to pay the following charges at the property:{" "}
                    </li>
                    <p>
                        1. Christmas Eve (24 December) Gala Dinner per adult: INR
                        4500.00
                    </p>
                    <p>
                        2. Christmas Eve (24 December) Gala Dinner per child: INR
                        2250.00 (from 6 to 12 years old)
                    </p>
                    <p>
                        3. New Year's Eve (31 December) Gala Dinner per adult: INR
                        8500.00
                    </p>
                    <p>
                        4. New Year's Eve (31 December) Gala Dinner per child: INR
                        4250.00 (from 6 to 12 years old)
                    </p>
                </div>
            </div>

            <div class="box5">
                <p>
                    By clicking on the button below, I acknowledge that I have
                    reviewed the{" "}
                    <a class="text-blue-700"
                       href="https://www.expedia.com/privacy?rfrr=HOT.CKO.Privacy"
                    >
                        Privacy Statement
                    </a>
                    and{" "}
                    <a class="text-blue-700"
                       href="https://travel.state.gov/content/passports/en/alertswarnings.html"
                    >
                        {" "}
                        Government Travel Advice
                    </a>{" "}
                    and have reviewed and accept the{" "}
                    <a class="text-blue-700"
                       href="https://www.expedia.com/Checkout/V1/HotelRulesAndRestrictions?tripid=8132b31c-00d9-59d2-a079-de7141902c86&rfrr=HOT.CKO.Rules&np=1"
                    >
                        Rules & Restrictions
                    </a>
                    and{" "}
                    <a class="text-blue-700"
                       href="https://www.expedia.com/terms?rfrr=HOT.CKO.Terms"
                    >
                        Terms of Use
                    </a>
                </p>
                <p class="text-green-800 flex mt-3 items-center">
                    <ChevronRight/>
                    Change of plans? No problem. You can cancel for
                    free
                </p>
                <button on:click={completeBooking} id="complete-btn">
                    Complete Booking {">"}
                </button>
                <div class="flex items-center">
                    <Lock/>
                    &nbsp;&nbsp;
                    <p>
                        We use secure transmission and encrypted storage to protect your
                        personal information.
                    </p>
                </div>
            </div>
        </div>
        <div class="lg:w-2/5">
            <div class="box7">
                <div>
                    <img class="p-4 w-full rounded-md"
                         src={vehicle?.image}
                         alt="Car preview"
                    />
                </div>
                <div class="p-4">
                    <p>
                        <b>{vehicle?.name_vehicle}</b>
                    </p>
                    <p>
                        {`${vehicle?.vehicle_category} ${vehicle?.vehicle_type}`}
                    </p>
                    <p>
                        Guests rated this property 4/5 for cleanliness
                    </p>
                    <p class="my-5">
                        {$locations}
                    </p>
                    <p>
                        <b>Check-in</b>: {$dates?.split('to')[0]}
                    </p>
                    <p>
                        <b>Check-out</b>: {$dates?.split('to')[1]}
                    </p>
                    <p>{calculateDaysBetween($dates)} day(s)</p>
                </div>
            </div>

            <div class="box8">
                <h3 class="text-lg font-bold">
                    Price details
                </h3>
                <hr class="border-t mt-4 mb-4"
                />
                <div class="flex items-center justify-between"
                >
                    <p>Car rental fee x 1 day</p>
                    <p>CA ${basePrice}</p>
                </div>
                {#if extras}
                {#each extras as extra}
                    <div class="flex justify-between items-center">
                        <div>{extra.name}</div>
                        <div>CA ${extra.price.toFixed(2)}</div>
                    </div>
                {/each}
                    {/if}
                <div class="flex items-center justify-between"
                >
                    <p>Taxes and fees !</p>
                    <p>CA ${taxes}</p>
                </div>
                <hr class="border-t mt-4 mb-4"
                />
                <div class="flex items-center justify-between"
                >
                    <p>
                        <b>Total</b>
                    </p>
                    <p>
                        <b>CA ${total}</b>
                    </p>
                </div>
                <hr class="border-t mt-4 mb-4"
                />
                <p>
                    <b>Not included in your total</b>
                </p>
                <p class="mb-4">
                    Mandatory charge: Collected at property.
                </p>
                <p>
                    Taxes and Fees due at the property are based on current exchange
                    rates, and are payable in local currency.
                </p>
            </div>
        </div>
    </div>

</div>
