import { intlFormat } from 'date-fns'

interface DisplayPriceProps {
  amount: number
  currency: string
}

export default function displayPrice ({
  amount,
  currency
}: DisplayPriceProps): string {
  return ''
}
