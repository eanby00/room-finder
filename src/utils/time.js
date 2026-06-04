export function timeToMinutes(time) {
  if (!time) {
    return 0;
  }

  const [hours, minutes] = String(time).split(':').map(Number);

  return hours * 60 + minutes;
}
