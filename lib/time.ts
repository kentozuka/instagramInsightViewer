import { format, differenceInDays } from 'date-fns'

export const dateFromNumber = (input: number) => {
  return format(input * 1000, 'yyyy/MM/dd')
}

export const differenceInDaysFromNumber = (start: number, end: number) => {
  return differenceInDays(start * 1000, end * 1000)
}
