export const currencyFormatter = (amount: number) => {
  return amount.toLocaleString('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })
}
