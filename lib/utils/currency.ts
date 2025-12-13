/**
 * Converts local currency (CRC) to USD
 * Uses NEXT_PUBLIC_USD_RATE environment variable or defaults to 500
 * @param amountLocal - Amount in local currency (CRC)
 * @returns Formatted USD string
 */
export function toUsd(amountLocal: number): string {
  const rate = Number.parseFloat(process.env.NEXT_PUBLIC_USD_RATE || "500")
  const usdAmount = amountLocal / rate
  return `$${usdAmount.toFixed(2)}`
}

/**
 * Formats a number as local currency (CRC)
 * @param amount - Amount to format
 * @returns Formatted CRC string
 */
export function toCrc(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`
}
