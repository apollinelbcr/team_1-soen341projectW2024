<script lang="ts">
    export let details = 
        {
            id: undefined,
            name_vehicle: undefined,
            image:undefined,
            vehicle_type: undefined,
            vehicle_category: undefined,
            vehicle_transmission: undefined,
            status: undefined,
            
        };
    
    
</script>

<div class="p-5">
    <div class="font-bold text-lg">
        {details.name_vehicle}
        
    </div>
    <br>
    <div class="table-row">
        <div class="w-1/2 mx-auto table-cell">
        
            <img src="{details.image}" alt={details.name_vehicle}/>
        </div>
    
        <div class=" pl-14 table-cell align-top">
            {details.vehicle_category}
            <br>
            {details.vehicle_type}
            <br>
            {details.vehicle_transmission}
            <br>
        </div>
    </div>
    
</div>

