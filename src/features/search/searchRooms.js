const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

function getDayName(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return DAY_NAMES[date.getDay()];
}

function timeStringToMinutes(timeString) {
  const [hour, minute] = String(timeString).split(':').map(Number);

  return hour * 60 + minute;
}

function createRoomKey(building, classroom) {
  return `${String(building).trim()}__${String(classroom).trim()}`;
}

function isOverlapped(existingStart, existingEnd, requestStart, requestEnd) {
  return existingStart < requestEnd && existingEnd > requestStart;
}

function regularTimeToMinutes(value) {
  const text = String(value || '').trim();

  if (!text.includes(':')) {
    return 0;
  }

  return timeStringToMinutes(text);
}

export function searchAvailableRooms({
  rooms,
  regulars,
  rentals = [],
  date,
  startTime,
  endTime,
  minCapacity,
}) {
  const requestDay = getDayName(date);
  const requestDate = normalizeDateText(date);
  const requestStart = timeStringToMinutes(startTime);
  const requestEnd = timeStringToMinutes(endTime);
  const capacity = Number(minCapacity || 0);

  const conflictedRoomKeys = new Set();

  regulars.forEach((regular) => {
    if (String(regular.요일).trim() !== requestDay) {
      return;
    }

    const existingStart = regularTimeToMinutes(regular.시작);
    const existingEnd = regularTimeToMinutes(regular.종료);

    if (isOverlapped(existingStart, existingEnd, requestStart, requestEnd)) {
      conflictedRoomKeys.add(createRoomKey(regular.건물, regular.강의실));
    }
  });

  rentals.forEach((rental) => {
    const rentalDate = normalizeDateText(rental.날짜);

    if (rentalDate !== requestDate) {
      return;
    }

    const existingStart = timeStringToMinutes(rental.시작);
    const existingEnd = timeStringToMinutes(rental.종료);

    if (isOverlapped(existingStart, existingEnd, requestStart, requestEnd)) {
      conflictedRoomKeys.add(createRoomKey(rental.건물, rental.강의실));
    }
  });

  return rooms.filter((room) => {
    const roomCapacity = Number(room.수용인원 || 0);
    const roomKey = createRoomKey(room.건물, room.강의실);

    return roomCapacity >= capacity && !conflictedRoomKeys.has(roomKey);
  });
}

function normalizeDateText(value) {
  if (!value) return '';

  return String(value)
    .trim()
    .replaceAll('.', '-')
    .replace(/-(\d)(?=-|$)/g, '-0$1');
}
