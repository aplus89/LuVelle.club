/**
 * Converts local currency (CRC) to USD
 * Uses NEXT_PUBLIC_EXCHANGE_RATE_USD_CRC environment variable or defaults to 530
 * @param amountLocal - Amount in local currency (CRC)
 * @returns Formatted USD string
 */
export function toUsd(amountLocal: number): string {
  const rate = Number.parseFloat(
    process.env.NEXT_PUBLIC_EXCHANGE_RATE_USD_CRC || process.env.NEXT_PUBLIC_USD_RATE || "530",
  )
  const usdAmount = amountLocal / rate
  return `$${usdAmount.toFixed(2)}`
}

/**
 * Gets the raw USD amount without formatting
 * @param amountLocal - Amount in local currency (CRC)
 * @returns USD amount as number
 */
export function toUsdRaw(amountLocal: number): number {
  const rate = Number.parseFloat(
    process.env.NEXT_PUBLIC_EXCHANGE_RATE_USD_CRC || process.env.NEXT_PUBLIC_USD_RATE || "530",
  )
  return amountLocal / rate
}

/**
 * Formats a number as local currency (CRC)
 * @param amount - Amount to format
 * @returns Formatted CRC string
 */
export function toCrc(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`
}

/**
 * Gets the current exchange rate
 * @returns Exchange rate as number
 */
export function getExchangeRate(): number {
  return Number.parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_RATE_USD_CRC || process.env.NEXT_PUBLIC_USD_RATE || "530")
}
