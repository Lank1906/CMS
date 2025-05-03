export const formatCurrency = (amount, currency = 'VND') => {
  const locales = {
    VND: 'vi-VN',
    USD: 'en-US',
  };

  return new Intl.NumberFormat(locales[currency] || 'en-US', {
    style: 'currency',
    currency,
  }).format(amount || 0);
};
