import * as XLSX from 'xlsx';
import { normalizeRoomName } from '../../utils/normalizeRoomName';

export const parseExcelFile = async (file) => {
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
};

const REQUIRED_HEADERS = ['건물명', '실명', '행사기간'];

const validateRentalHeaders = (rows) => {
  const headers = rows[0] || [];

  const missingHeaders = REQUIRED_HEADERS.filter(
    (header) => !headers.includes(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `잘못된 형식의 파일입니다.\n누락된 항목: ${missingHeaders.join(', ')}`
    );
  }
};

export const parseRentalRows = (rows) => {
  validateRentalHeaders(rows);

  return rows
    .slice(2)
    .filter((row) => row[1] && row[3] && row[7])
    .map((row) => {
      const period = String(row[7]);

      const [startText, endText] = period.split(' ~ ');

      const [dateText, startTime] = startText.split(' ');
      const [, endTime] = endText.split(' ');

      return {
        건물: String(row[1]).trim(),
        강의실: normalizeRoomName(row[5]),
        날짜: dateText,
        시작: startTime,
        종료: endTime,
      };
    });
};

export const parseRentalExcelFile = async (file) => {
  const rows = await parseExcelFile(file);
  return {
    rentals: parseRentalRows(rows),
    lastUpdatedAt: new Date(file.lastModified).toISOString(),
  };
};
