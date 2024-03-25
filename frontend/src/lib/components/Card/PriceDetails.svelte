<script>
  export let className = ""
  let details = {
    carRentalFee: 51.40,
    taxesAndFees: 25.07,
    discount: 26, // This represents the 25% discount
  };

  // Calculate totals
  let total = details.carRentalFee + details.taxesAndFees;
</script>

<div class='bg-white p-6 rounded-lg shadow-lg {className ?? ""}'>
  <div class="mb-6">
    <h2 class="text-xl font-bold text-gray-800">Price details</h2>
  </div>
  <div class="mb-4">
    <div class="flex justify-between items-center">
      <div>Car rental fee x 1 day</div>
      <div>CA ${details.carRentalFee.toFixed(2)}</div>
    </div>
    <div class="flex justify-between items-center mt-2">
      <div>Taxes and fees</div>
      <div>CA ${details.taxesAndFees.toFixed(2)}</div>
    </div>
  </div>
  <div class="border-t border-gray-200 my-4"></div>
  <div class="flex justify-between items-center font-bold mb-4">
    <div>Total</div>
    <div>CA ${total.toFixed(2)}</div>
  </div>
  <button class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
    Reserve
  </button>
</div>
