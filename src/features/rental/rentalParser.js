import * as XLSX from 'xlsx';
import { normalizeRoomName } from '../../utils/normalizeRoomName';

const REQUIRED_HEADERS = ['건물명', '실명', '행사기간'];

export async function parseExcelFile(file) {
  const arrayBuffer = await file.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    type: 'array',
  });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: '',
  });
}

function getHeaderIndexes(headers) {
  const missingHeaders = REQUIRED_HEADERS.filter(
    (header) => !headers.includes(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `잘못된 형식의 파일입니다.\n누락된 항목: ${missingHeaders.join(', ')}`
    );
  }

  return {
    building: headers.indexOf('건물명'),
    room: headers.indexOf('실명'),
    period: headers.indexOf('행사기간'),
  };
}

function parseRentalPeriod(period) {
  const [startText, endText] = String(period).split(' ~ ');

  if (!startText || !endText) {
    throw new Error('행사기간 형식이 올바르지 않습니다.');
  }

  const [dateText, startTime] = startText.split(' ');
  const [, endTime] = endText.split(' ');

  if (!dateText || !startTime || !endTime) {
    throw new Error('행사기간의 날짜 또는 시간 형식이 올바르지 않습니다.');
  }

  return {
    dateText,
    startTime,
    endTime,
  };
}

export function parseRentalRows(rows) {
  const headers = rows[0] || [];
  const headerIndexes = getHeaderIndexes(headers);

  return rows
    .slice(2)
    .filter((row) => {
      return (
        row[headerIndexes.building] &&
        row[headerIndexes.room] &&
        row[headerIndexes.period]
      );
    })
    .map((row) => {
      const { dateText, startTime, endTime } = parseRentalPeriod(
        row[headerIndexes.period]
      );

      return {
        건물: String(row[headerIndexes.building]).trim(),
        강의실: normalizeRoomName(row[headerIndexes.room]),
        날짜: dateText,
        시작: startTime,
        종료: endTime,
      };
    });
}

export async function parseRentalExcelFile(file) {
  const rows = await parseExcelFile(file);

  return {
    rentals: parseRentalRows(rows),
    rentalLastUpdatedAt: new Date(file.lastModified).toISOString(),
  };
}
