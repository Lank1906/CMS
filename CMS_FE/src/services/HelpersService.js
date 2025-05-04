export const dateFormater = (rawDate) => {
  const date = new Date(rawDate);
  return date.toLocaleDateString('de-DE').replaceAll('.', '/');
};
