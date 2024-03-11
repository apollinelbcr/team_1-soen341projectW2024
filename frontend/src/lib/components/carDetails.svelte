<script lang="ts">
    export let details = 
        {
            id: "vehi1234",
            name: "Nissan",
            type: "Rogue",
            category: "category unknown",
            capacity: "5",
            transmission: "automatic",
            src:"2023-Nissan-Rogue.png"
        };
    
    
</script>

<div class="p-5">
    <div class="font-bold text-lg">
        {details.name} {details.type}
        
    </div>
    <br>
    <div class="table-row">
        <div class="w-1/2 mx-auto table-cell">
        
            <img src={details.src} alt="Nissan-Rogue"/>
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

