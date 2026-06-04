import { APPS_SCRIPT_URL } from '../../config/appScript';
import { RENTAL_REQUEST_TYPE } from './rentalConstants';

export async function sendRentalRowsToSheet({ rows, rentalLastUpdatedAt }) {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      type: RENTAL_REQUEST_TYPE.RENTALS,
      rows,
      rentalLastUpdatedAt,
    }),
  });
}
