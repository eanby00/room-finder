import { APPS_SCRIPT_URL } from '../config/appScript';

const REQUEST_TYPE = {
  LOG: 'log',
};

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
    rentalMeta: data.rentalMeta || {},
  };
}

export function logSearchUsage() {
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      type: REQUEST_TYPE.LOG,
    }),
  }).catch(() => {});
}
