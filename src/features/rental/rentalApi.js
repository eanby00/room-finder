import { APPS_SCRIPT_URL } from '../../config/appScript';

export const sendRentalRowsToSheet = async (rentalRows) => {
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      type: 'rentalRows',
      rows: rentalRows,
    }),
  });
};
