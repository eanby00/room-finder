import { APPS_SCRIPT_URL } from '../../config/appScript';
import { RENTAL_REQUEST_TYPE } from './rentalConstants';

export async function sendRentalRowsToSheet({ rentals, lastUpdatedAt }) {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      type: RENTAL_REQUEST_TYPE.ROWS,
      rentals,
      lastUpdatedAt,
    }),
  });
}
