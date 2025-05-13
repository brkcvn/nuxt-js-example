export const { format: formatNumber } = Intl.NumberFormat('en-GB', {
    notation: 'compact',
    maximumFractionDigits: 1
})
export const { format: formatCurrency } = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
})