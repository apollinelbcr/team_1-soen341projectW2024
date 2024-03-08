<script>
    export let src="2023-Nissan-Rogue.png"
    export let details = {
        name: "Nissan",
        type: "Rogue",
        category: "category unknown",
        capacity: "5",
        transmission: "automatic"
    };


</script>

<div class="p-5">
    <div class="font-bold text-lg">
        {details.name} {details.type}

    </div>
    <br>
    <div class="table-row">
        <div class="w-1/2 mx-auto table-cell">

            <img src={src} alt="Nissan-Rogue"/>
        </div>

        <div class=" pl-14 table-cell align-top">
            {details.category}
            <br>
            {details.capacity} passengers
            <br>
            {details.transmission}
            <br>
        </div>
    </div>

</div>