import { timeToMinutes } from '../../utils/time';

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
