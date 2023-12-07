export interface IPlan {
  id: number
  type: 'string'
  title: 'string'
  cardType: 'string'
  price: 'number'
  time: 'string'
  color: 'string'
  basicFeatures: {
    message: 'string'
    value?: 'string'
    extra?: 'boolean'
  }[]
}
