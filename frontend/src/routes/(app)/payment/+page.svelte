<script>
    import {ChevronDown, ChevronRight, CreditCard, Lock} from "lucide-svelte";
</script>

<div id="whole-page" class="max-w-4xl mx-auto">
    <h1 class="text-blue-900 text-xl font-bold mt-8">
        Secure booking — only takes 2 minutes!
    </h1>

    <div class="flex mt-4 shadow p-4">
        <!-- Icon here: For demo, replace with Tailwind CSS icon or custom SVG -->
        <div class="text-3xl">📅</div>
        <div class="ml-4">
            <p class="font-bold">Free cancellation before Tue, Aug 30, 6:00pm (property local time)</p>
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
                        <input type="text" class="input w-2/3"/>
                    </div>
                    <div class="inputdiv">
                        <p class="name">Debit/Credit card number</p>
                        <input
                                type="number"
                                class="input w-1/2"
                        />
                    </div>
                    <div class="inputdiv">
                        <p class="name">Expiration date</p>
                        <div class="flex">
                            <select
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
                            <select class="country w-1/4">
                                <option value="usa">
                                    Year
                                    <ChevronDown/>
                                </option>
                                <option value="india">
                                    2020
                                    <ChevronDown/>
                                </option>
                                <option value="china">
                                    2021
                                    <ChevronDown/>
                                </option>
                                <option value="uk">
                                    2022
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2024
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2025
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2026
                                    <ChevronDown/>
                                </option>
                                <option value="turky">
                                    2027
                                    <ChevronDown/>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="inputdiv">
                            <p class="name">Security code</p>
                            <input
                                    type="number"
                                    class="input w-1/3"
                            />
                        </div>
                        <div class="inputdiv">
                            <p class="name">Billing ZIP code</p>
                            <input
                                    type="number"
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
                <button id="complete-btn">
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
                         src="details?.images[0]?.src"
                         alt="details.title"
                    />
                </div>
                <div class="p-4">
                    <p>
                        <b>{"details.title"}</b>
                    </p>
                    <p>
                        <b>{"details.rating"}/5</b> Very good ({"details.reviews"} reviews)
                    </p>
                    <p>
                        Guests rated this property {"details.rating"}/5 for cleanliness
                    </p>
                    <p class="my-5">
                        1 Room: King, Executive Room, Balcony, River View
                    </p>
                    <p>
                        <b>Check-in</b>: Fri, Sep 9
                    </p>
                    <p>
                        <b>Check-out</b>: Sat, Sep 10
                    </p>
                    <p>1-night stay</p>
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
                    <p>1 room x 1 night</p>
                    <p>${100}</p>
                </div>
                <div class="flex items-center justify-between"
                >
                    <p>Taxes and fees !</p>
                    <p>${Math.floor(100 * 0.28)}</p>
                </div>
                <hr class="border-t mt-4 mb-4"
                />
                <div class="flex items-center justify-between"
                >
                    <p>
                        <b>Total</b>
                    </p>
                    <p>
                        <b>${100 + Math.floor(+(100 * 0.28))}</b>
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
