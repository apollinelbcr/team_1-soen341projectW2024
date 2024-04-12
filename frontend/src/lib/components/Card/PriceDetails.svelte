<script>
  export let className = "";
  export let price;
  let details = {
    carRentalFee: 51.40,
    taxesAndFees: 25.07,
    discount: 26, // This represents the 25% discount
  };

  // Calculate totals
  let total = details.carRentalFee + details.taxesAndFees;
</script>


