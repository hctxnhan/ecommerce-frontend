const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function getCurrency(value: number) {
  return USDollar.format(value);
}

export function clampValue(current: number, min: number, max: number) {
  return Math.min(Math.max(current, min), max);
}