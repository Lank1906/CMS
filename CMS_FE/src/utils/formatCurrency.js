import dayjs from 'dayjs';
export const formatCurrency = (amount) => {
  if (!amount) return '0';
  return new Intl.NumberFormat('de-DE').format(amount);
};
export const formatDate = (dateStr) => {
  return dateStr ? dayjs(dateStr).format('YYYY-MM-DD') : '';
};
