const API_URL =
  'https://script.google.com/macros/s/AKfycbyTqY0Z5UwJ0MsX1TKGdTflGQjDh97QGPHRfW4s9WDkLVYZ88N9ePG820tLs4qZY5EuwA/exec';

export async function searchAvailableRooms({
  date,
  startTime,
  endTime,
  minCapacity,
}) {
  const params = new URLSearchParams({
    date,
    startTime,
    endTime,
    minCapacity: minCapacity || 0,
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.message);
  }

  return data;
}
