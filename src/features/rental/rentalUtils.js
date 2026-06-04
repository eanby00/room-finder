export function createBuildingMeta(rentals, rentalLastUpdatedAt) {
  return rentals.reduce((acc, rental) => {
    const building = rental.건물;
    const date = rental.날짜;

    if (!building || !date) {
      return acc;
    }

    const currentEndDate = acc[building]?.rentalEndDate;

    if (!currentEndDate || String(date) > String(currentEndDate)) {
      acc[building] = {
        rentalLastUpdatedAt,
        rentalEndDate: date,
      };
    }

    return acc;
  }, {});
}
