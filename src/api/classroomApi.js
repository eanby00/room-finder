import { APPS_SCRIPT_URL } from '../config/appScript';

const REQUEST_TYPE = {
  ALL: 'all',
  LOG: 'log',
};

export async function fetchClassroomData() {
  const response = await fetch(`${APPS_SCRIPT_URL}?type=${REQUEST_TYPE.ALL}`);
  const data = await response.json();

  if (data.success === false || data.error) {
    throw new Error(data.message || '강의실 데이터를 불러오지 못했습니다.');
  }

  return {
    rooms: data.classrooms || [],
    regulars: data.regulars || [],
    rentals: data.rentals || [],
    meta: data.meta || {},
    buildingMeta: createBuildingMetaMap(data.buildingMeta || []),
  };
}

function createBuildingMetaMap(buildingMetaRows) {
  return buildingMetaRows.reduce((acc, row) => {
    const building = row.건물;

    if (!building) return acc;

    acc[building] = {
      rentalLastUpdatedAt: row.rentalLastUpdatedAt || '',
      rentalEndDate: row.rentalEndDate || '',
    };

    return acc;
  }, {});
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
