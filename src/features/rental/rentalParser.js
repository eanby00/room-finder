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

export const parseRentalRows = (rows) => {
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
  return parseRentalRows(rows);
};
