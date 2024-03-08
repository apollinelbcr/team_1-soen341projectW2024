export const sortByOptions = [
    '',
    'Total price',
    'Capacity'
] as const;

export const carTypes = [
    'Sedan',
    'SUV',
    'Van',
    'Pickup Truck',
    'Sports Car',
    'Convertible',
    'Luxury',
] as const;
export const capacities = [
    '2-5 passengers',
    '6 or more passengers',
] as const;
export const transmissions = [
    'Manual',
    'Automatic',
] as const;
export const totalPrices = [
    'Less than CA $100',
    'CA $100 to CA $200',
    'CA $200 to CA $300',
    'CA $300 to CA $400',
    'Greater than CA $400',
] as const;