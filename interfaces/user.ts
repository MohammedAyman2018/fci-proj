export default interface IUser {
  _id: string | null
  createdAt: Date | null
  name: string
  email: string
  phone: string
  country: string
  address: string
  dob: Date
  password: string
  fav: string[]
  orders: string[]
  role: string
  storeName: string
}
