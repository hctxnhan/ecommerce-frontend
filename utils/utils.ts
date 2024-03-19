const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function getCurrency(value: number) {
  return USDollar.format(value);
}
