export function numberToPriceFormat(price?: number | null, removePrefix?: boolean) {
  const isBelowZero = (price || 0) < 0;

  return price !== null && price !== undefined
    ? `${Math.abs(price)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${isBelowZero ? '-' : ''}${
        !removePrefix ? ' تومان ' : ''
      }`
    : 'برای اطلاع از قیمت با پشتیبانی تماس بگیرید';
}
