export function normalizeRoomName(raw) {
  const text = String(raw).trim();

  const basementMatch = text.match(
    /(?:_|\/|\(|\s)(B\d+(?:-\d+)?)(?:호|\)|\s|$)/i
  );
  if (basementMatch) return basementMatch[1].toUpperCase();

  const underbarMatch = text.match(/_\s*(\d{3,4}(?:-\d+)?)(?:호)?\s*$/);
  if (underbarMatch) return underbarMatch[1];

  const parenthesisMatch = text.match(/\((\d{3,4}(?:-\d+)?)(?:[_\s][^)]+)?\)/);
  if (parenthesisMatch) return parenthesisMatch[1];

  const hoMatch = text.match(/(\d{3,4}(?:-\d+)?)\s*호/);
  if (hoMatch) return hoMatch[1];

  const slashMatch = text.match(/^(\d{3,4})\s*\/\s*\d{3,4}$/);
  if (slashMatch) return slashMatch[1];

  const pcRoomMatch = text.match(/정석현\s*PC[-\s]?(\d)실?/i);
  if (pcRoomMatch) {
    return `정석현 PC ${pcRoomMatch[1]}`;
  }

  return text;
}
