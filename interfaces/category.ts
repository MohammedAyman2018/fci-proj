export default interface ICategory {
  _id: string | null
  createdAt: Date | null
  name: string
  storeName: string
  subCategory: [{ name: string }]
}
