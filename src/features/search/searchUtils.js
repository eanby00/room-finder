export function timeToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export function isValidTimeRange(startTime, endTime) {
  return timeToMinutes(startTime) < timeToMinutes(endTime);
}

export function createSearchPayload(searchCondition) {
  return {
    date: searchCondition.useDate,
    startTime: searchCondition.startTime,
    endTime: searchCondition.endTime,
    minCapacity: Number(searchCondition.capacity || 0),
  };
}
