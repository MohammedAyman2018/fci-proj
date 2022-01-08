import ICategory from './category'

export default interface IProduct {
  _id: string | null
  createdAt: Date | null
  name: string
  images: string[]
  price: number
  category: ICategory[]
  amount: {
    amountType: string
    available: number
    alarm: boolean
    alarmAmount: number
  }
  url: string
  views: string
  visible: {
    store: boolean
    app: boolean
  }
  storeName: string
}
