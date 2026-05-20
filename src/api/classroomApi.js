import { APPS_SCRIPT_URL } from '../config/appScript';

export async function fetchClassroomData() {
  const response = await fetch(APPS_SCRIPT_URL);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.message);
  }

  return {
    rooms: data.rooms || [],
    regulars: data.regulars || [],
    rentals: data.rentals || [],
    updatedAt: data.updatedAt,
  };
}
