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

export function groupRoomsByBuilding(rooms) {
  return rooms.reduce((acc, room) => {
    const building = room.건물;

    if (!acc[building]) {
      acc[building] = [];
    }

    acc[building].push(room);

    return acc;
  }, {});
}

export function formatUpdatedAt(value) {
  if (!value) return '갱신 정보 없음';

  return new Date(value).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatEndDate(value) {
  if (!value) return '';

  return `(~${value})`;
}
