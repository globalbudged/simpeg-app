import { date } from 'quasar'

const dbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}

export { dbFormat }
