export const dateFormater = (rawDate) => {
  const date = new Date(rawDate);
  return date.toLocaleDateString('de-DE').replaceAll('.', '/');
};
export const getBackgroundColor = (track) => {
  switch (track) {
    case 'Planning':
      return 'rgb(33, 143, 202)';
    case 'Completed':
      return 'green';
    case 'InProgress':
      return 'rgb(237, 197, 21)';
    case 'Cancelled':
      return 'rgb(207, 7, 0)';
    case 'Overdue':
      return 'rgb(139, 139, 139)';
    default:
      return 'white';
  }
};
