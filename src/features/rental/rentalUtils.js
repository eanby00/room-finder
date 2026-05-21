export function createRentalMeta(rentals, lastUpdatedAt) {
  return rentals.reduce((acc, rental) => {
    const building = rental.건물;
    const date = rental.날짜;

    if (!building || !date) {
      return acc;
    }

    const currentEndDate = acc[building]?.endDate;

    if (!currentEndDate || date > currentEndDate) {
      acc[building] = {
        lastUpdatedAt,
        endDate: date,
      };
    }

    return acc;
  }, {});
}
